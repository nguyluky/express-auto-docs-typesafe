import { Server, Socket, Namespace } from 'socket.io';
import jwt from 'jsonwebtoken';
import { Logger } from '@utils/logger'; // Assume you have a Logger utility
import { PrismaClient } from '@prisma/client';
import { accessTokenPayload } from '@utils/jwt';
import { log } from 'console';

interface socketData {
    user: accessTokenPayload
}

interface SocketEventHandler {
    (client: Socket, data: any): void;
}


export class SocketEmitEvent<T = any> {
    eventName: string; // Event name to emit
    data: T; // Data to emit with the event
    to: string | string[] | undefined; // Optional recipient(s) for the event

    constructor(eventName: string, data: T, to?: string | string[]) {
        this.eventName = eventName;
        this.data = data;
        this.to = to;
    }
}

export abstract class SocketController {
    protected path: string; // Namespace path (e.g., '/public', '/exchange')

    constructor(path?: string) {
        // Default path based on class name if not provided
        this.path = path || `/${this.constructor.name.toLowerCase()}`;
    }

    // Optional: Override in subclasses for connection handling
    protected onConnect?(client: Socket): void {
        Logger.info(`Client connected to ${this.path}: ${client.id}`);
    }

    // Optional: Override in subclasses for disconnection handling
    protected onDisconnect?(client: Socket): void {
        Logger.info(`Client disconnected from ${this.path}: ${client.id}`);
    }

    // Register the namespace and event handlers
    public register(server: Server): Namespace {
        Logger.info(`Registering namespace ${this.path}`, { path: this.path });
        const subServer = server.of(this.path);

        // middleware 
        // find methods starting with 'use'

        const middlewareMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter((key) => typeof (this as any)[key] === 'function' && key.startsWith('use'));

        for (const key of middlewareMethods) {
            const middlewareName = key.replace(/^use/, '').toLowerCase();
            subServer.use(async (client: Socket, next: (err?: any) => void) => {
                try {
                    // Call the middleware method
                    await (this as any)[key](client, next);
                } catch (error) {
                    Logger.error(`Error in middleware ${middlewareName}: ${error}`, { path: this.path, clientId: client.id });
                    next(error);
                }
            });
        }

        subServer.on('connect', (client: Socket) => {
            console.log(`Client connected to namespace ${this.path}: ${client.id}`);
            // Call onConnect if defined
            if (this.onConnect) {
                this.onConnect(client);
            }

            // Register event handlers for methods starting with 'on'skip 'onConnect' and 'onDisconnect'
            const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
                .filter((key) => typeof (this as any)[key] === 'function' && key.startsWith('on'))
                .filter((key) => key !== 'onConnect' && key !== 'onDisconnect');

            for (const key of methods) {
                const eventName = key.replace(/^on/, '')
                client.on(eventName, async (data: any, callback?: (response: any) => void) => {
                    const dataEvent = await (this as any)[key](client, data, callback);
                    if (dataEvent instanceof SocketEmitEvent) {
                        if (dataEvent.to) {
                            // Emit to specific recipient(s)
                            client.to(dataEvent.to).emit(dataEvent.eventName, dataEvent.data);
                        } else {
                            // Emit to all clients in the namespace
                            subServer.emit(dataEvent.eventName, dataEvent.data);
                        }
                    } else {
                        // If no SocketEmitEvent is returned, just log the data
                        Logger.info(`Received data on ${eventName}:`, { data });
                    }
                });
            }

            client.on('disconnect', () => {
                if (this.onDisconnect) {
                    this.onDisconnect(client);
                }
            });
        });

        return subServer;
    }
}
