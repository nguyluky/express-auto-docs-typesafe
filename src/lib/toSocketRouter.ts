import { UnauthorizedError } from "@utils/exception";
import "reflect-metadata";
import { Server, Socket } from 'socket.io';
import { SocketController, SocketEmitEvent } from './socket_declaration';
import { SOCKET_EVENT_KEY, SOCKET_NAMESPACE_KEY, SocketEventInfo, SocketEventType, SocketNamespaceInfo } from './socket_decorators';
import { toSchema } from './type_declaration';

interface SocketRouterSchema {
    namespacePath: string;
    namespaceInfo: SocketNamespaceInfo;
    controller: SocketController;
    events: SocketEventSchema[];
}

interface SocketEventSchema {
    eventName: string;
    methodName: string;
    eventInfo: SocketEventInfo;
    requestSchema?: any;
    responseSchema?: any;
}

export function toSocketRouterSchema(controllers: any[]): SocketRouterSchema[] {
    const schemas: SocketRouterSchema[] = [];

    for (const ControllerClass of controllers) {
        const controller = new ControllerClass() as SocketController;
        const namespaceInfo = Reflect.getMetadata(SOCKET_NAMESPACE_KEY, ControllerClass);

        if (!namespaceInfo) continue;

        const events: SocketEventSchema[] = [];

        // Scan all methods for socket events
        const methods = [
            ...Object.getOwnPropertyNames(Object.getPrototypeOf(controller)),
            ...Object.getOwnPropertyNames(controller)
        ].filter(method => typeof controller[method as keyof SocketController] === 'function');

        for (const method of methods) {
            const eventInfo = Reflect.getMetadata(SOCKET_EVENT_KEY, controller, method) as SocketEventInfo;
            if (!eventInfo) continue;

            events.push({
                eventName: eventInfo.eventName,
                methodName: method,
                eventInfo,
                requestSchema: eventInfo.requestSchema,
                responseSchema: eventInfo.responseSchema
            });
        }

        schemas.push({
            namespacePath: namespaceInfo.path,
            namespaceInfo,
            controller,
            events
        });
    }

    return schemas;
}

// Validate socket data
function validateSocketData(schema: any, data: any): any {
    if (!schema) return data;

    const zodSchema = toSchema(schema);
    if (!zodSchema) return data;

    const result = zodSchema.safeParse(data);
    if (result.success) {
        return result.data;
    } else {
        throw new Error(`Validation failed: ${result.error.message}`);
    }
}

// Handle socket event
async function handleSocketEvent(
    controller: SocketController,
    eventSchema: SocketEventSchema,
    client: Socket,
    data: any,
    callback?: Function
) {
    try {
        // Validate request data if schema exists
        const validatedData = validateSocketData(eventSchema.requestSchema, data);

        // Call controller method
        const method = controller[eventSchema.methodName as keyof SocketController] as Function;
        const result = await method.call(controller, client, validatedData, callback);

        // Handle result if it's a SocketEmitEvent
        if (result instanceof SocketEmitEvent) {
            await emitSocketEvent(client, result);
        }

        return result;
    } catch (error) {
        console.error(`Socket event error [${eventSchema.eventName}]:`, error);
        client.emit('error', {
            event: eventSchema.eventName,
            message: error instanceof Error ? error.message : 'Unknown error',
            code: 'SOCKET_ERROR'
        });
    }
}

// Emit socket event with proper targeting
async function emitSocketEvent(client: Socket, event: SocketEmitEvent) {
    const { eventName, data, target, room, broadcast } = event;

    if (broadcast) {
        // Broadcast to all clients in namespace
        client.broadcast.emit(eventName, data);
    } else if (room) {
        // Emit to specific room
        client.to(room).emit(eventName, data);
    } else if (target) {
        // Emit to specific user(s)
        if (Array.isArray(target)) {
            target.forEach(t => client.to(t).emit(eventName, data));
        } else {
            client.to(target).emit(eventName, data);
        }
    } else {
        // Emit to sender only
        client.emit(eventName, data);
    }
}

// Convert router schemas to Socket.io server
export function toSocketServer(
    io: Server,
    routerSchemas: SocketRouterSchema[]
): Server {

    for (const schema of routerSchemas) {
        const { namespacePath, namespaceInfo, controller, events } = schema;

        // Create namespace
        const namespace = io.of(namespacePath);
        controller.setNamespace(namespace);
        controller.setIO(io);

        // Apply auth middleware if required
        if (namespaceInfo.auth) {
            namespace.use(async (Socket, next) => {
                // console.log(Socket.handshake);
                for (const auth of namespaceInfo.auth!) {

                    const data = await auth.validate(Socket.handshake as any)
                    if (!data) {
                        return next(new UnauthorizedError("Authentication failed"));
                    }
                    Socket.data = {...Socket.data, ...data};
                }

                next();
            }) 
        }
        
        // Handle connections
        namespace.on('connection', (client: Socket) => {
            console.log(`Client connected to ${namespacePath}: ${client.id}`);

            // Call controller's onConnect
            controller.onConnect(client);

            // Register event handlers
            for (const eventSchema of events) {
                const { eventName, eventInfo } = eventSchema;

                // Only register listeners for events that accept client input
                if (eventInfo.type === SocketEventType.CLIENT_TO_SERVER ||
                    eventInfo.type === SocketEventType.BIDIRECTIONAL) {

                    if (eventInfo.acknowledgment) {
                        // With acknowledgment callback
                        client.on(eventName, async (data: any, callback: Function) => {
                            await handleSocketEvent(controller, eventSchema, client, data, callback);
                        });
                    } else {
                        // Without callback
                        client.on(eventName, async (data: any) => {
                            await handleSocketEvent(controller, eventSchema, client, data);
                        });
                    }
                }
            }

            // Handle disconnect
            client.on('disconnect', (reason: string) => {
                console.log(`Client disconnected from ${namespacePath}: ${client.id}, reason: ${reason}`);
                controller.onDisconnect(client);
            });

            // Handle errors
            client.on('error', (error: Error) => {
                console.error(`Socket error in ${namespacePath}:`, error);
                controller.onError(client, error);
            });
        });
    }

    return io;
}

// Helper function để emit events từ business logic
export class SocketEventEmitter {

    private static _instance: SocketEventEmitter | null = null;

    constructor(private io: Server) {
        if (SocketEventEmitter._instance) {
            throw new Error("SocketEventEmitter is a singleton and has already been instantiated.");
        }
        SocketEventEmitter._instance = this;
    }

    // Emit to specific namespace
    emitToNamespace(namespacePath: string, event: SocketEmitEvent) {
        const namespace = this.io.of(namespacePath);

        if (event.broadcast) {
            namespace.emit(event.eventName, event.data);
        } else if (event.room) {
            namespace.to(event.room).emit(event.eventName, event.data);
        } else if (event.target) {
            if (Array.isArray(event.target)) {
                event.target.forEach(t => namespace.to(t).emit(event.eventName, event.data));
            } else {
                namespace.to(event.target).emit(event.eventName, event.data);
            }
        }
    }

    // Emit to all namespaces
    emitToAll(event: SocketEmitEvent) {
        this.io.emit(event.eventName, event.data);
    }
}
