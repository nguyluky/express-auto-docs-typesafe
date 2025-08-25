import { Namespace, Server, Socket } from 'socket.io';

export abstract class SocketController {
    protected namespace?: Namespace;
    protected io?: Server;

    // Public setters for framework use
    setNamespace(namespace: Namespace): void {
        this.namespace = namespace;
    }

    setIO(io: Server): void {
        this.io = io;
    }

    // Lifecycle methods
    onConnect(client: Socket): void {}
    onDisconnect(client: Socket): void {}
    onError(client: Socket, error: Error): void {}
}

export class SocketEmitEvent<T = any> {
    constructor(
        public eventName: string,
        public data: T,
        public target?: string | string[], // userId hoặc roomId
        public room?: string,
        public broadcast?: boolean
    ) {}
}