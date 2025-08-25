import { SecurityScheme } from "@lib/BaseAuth";
import "reflect-metadata";
import { PropertyKey, wa } from "./PropertyKey";

export const SOCKET_EVENT_KEY = "__socket_event";
export const SOCKET_NAMESPACE_KEY = "__socket_namespace";

// Enum cho các loại Socket Event
export enum SocketEventType {
    CLIENT_TO_SERVER = 'client-to-server',        // Client gửi, server nhận
    SERVER_TO_CLIENT = 'server-to-client',        // Server gửi, client nhận  
    BIDIRECTIONAL = 'bidirectional',              // Cả hai chiều
    SERVER_EMIT_ONLY = 'server-emit-only',        // Chỉ server emit (như notifications)
    CLIENT_LISTEN_ONLY = 'client-listen-only'     // Chỉ client listen
}

export interface SocketEventInfo {
    eventName: string;
    type: SocketEventType;
    description?: string;
    requestSchema?: any;
    responseSchema?: any;
    example?: any;
    deprecated?: boolean;
    acknowledgment?: boolean; // Có cần ACK không
}

export interface SocketNamespaceInfo {
    path: string;
    description?: string;
    auth?: SecurityScheme[];
}

// Main decorator cho Socket Event
export const SocketEvent = (eventName: string, type: SocketEventType, options?: {
    description?: string;
    example?: any;
    deprecated?: boolean;
    acknowledgment?: boolean;
}) => {
    return function (target: any, propertyKey: PropertyKey) {

        let existing = Reflect.getMetadata(SOCKET_EVENT_KEY, target, wa(propertyKey)) || {};
        // console.log(existing)
        const eventInfo: SocketEventInfo = {
            eventName,
            type,
            description: options?.description,
            example: options?.example,
            deprecated: options?.deprecated,
            acknowledgment: options?.acknowledgment,
        };
        existing = { ...existing, ...eventInfo }


        Reflect.defineMetadata(SOCKET_EVENT_KEY, existing, target, wa(propertyKey));
    };
};

// Decorator cho Socket Namespace
export const SocketNamespace = (path: string, options?: {
    description?: string;
    auth?: SecurityScheme[];
}) => {
    return function (target: any) {
        const namespaceInfo: SocketNamespaceInfo = {
            path,
            description: options?.description,
            auth: options?.auth
        };
        Reflect.defineMetadata(SOCKET_NAMESPACE_KEY, namespaceInfo, target);
    };
};

// Decorator riêng cho Request schema (optional)
export const SocketRequest = (schema: any) => {
    return function (target: any, propertyKey: PropertyKey) {
        const existing = Reflect.getMetadata(SOCKET_EVENT_KEY, target, wa(propertyKey)) || {};
        existing.requestSchema = schema;
        Reflect.defineMetadata(SOCKET_EVENT_KEY, {...existing}, target, wa(propertyKey));
    };
};

// Decorator riêng cho Response schema (optional)
export const SocketResponse = (schema: any) => {
    return function (target: any, propertyKey: PropertyKey) {
        const existing = Reflect.getMetadata(SOCKET_EVENT_KEY, target, wa(propertyKey)) || {};
        existing.responseSchema = schema;
        Reflect.defineMetadata(SOCKET_EVENT_KEY, {...existing}, target, wa(propertyKey));
    };
};

// Shorthand decorators cho các case phổ biến
export const SocketListen = (eventName: string, options?: { description?: string; example?: any }) =>
    SocketEvent(eventName, SocketEventType.CLIENT_TO_SERVER, options);

export const SocketEmit = (eventName: string, options?: { description?: string; example?: any }) =>
    SocketEvent(eventName, SocketEventType.SERVER_TO_CLIENT, options);

export const SocketBidirectional = (eventName: string, options?: { description?: string; example?: any }) =>
    SocketEvent(eventName, SocketEventType.BIDIRECTIONAL, options);
