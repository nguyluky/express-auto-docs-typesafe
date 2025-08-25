import "reflect-metadata"
import { PropertyKey, wa } from "./PropertyKey";
import { BadRequestError } from "@utils/exception";
import { SecurityScheme } from "./BaseAuth";

export const HTTP_INFO_KEY = "__http_info"
export const HTTP_RESP_KEY = "__http_resp"

export interface HttpInfo {
    path: string,
    method: 'get' | 'post' | 'delete' | 'put' | 'use',
    data?: HttpInfoData
}

interface HttpInfoData {
    middlewares?: any[],
    isAuth?: (SecurityScheme)[],
    tags?: string[],
    summary?: string,
    description?: string
}

export const Get = (path?: string) => {
    return function (target: any, propertyKey: PropertyKey) {
        const data: HttpInfo = Reflect.getMetadata(HTTP_INFO_KEY, target, wa(propertyKey)) as HttpInfo || {};
        data.path = path || '/' + wa(propertyKey);
        data.method = "get";
        Reflect.defineMetadata(HTTP_INFO_KEY, {...data}, target, wa(propertyKey));
    }
}

export const Post = (path?: string) => {
    return function (target: any, propertyKey: PropertyKey) {
        const data: HttpInfo = Reflect.getMetadata(HTTP_INFO_KEY, target, wa(propertyKey)) as HttpInfo || {};
        data.path = path || '/' + wa(propertyKey);
        data.method = "post";
        Reflect.defineMetadata(HTTP_INFO_KEY, {...data}, target, wa(propertyKey));
    }
}
export const Put = (path?: string) => {
    return function (target: any, propertyKey: PropertyKey) {
        const data: HttpInfo = Reflect.getMetadata(HTTP_INFO_KEY, target, wa(propertyKey)) as HttpInfo || {};
        data.path = path || '/' + wa(propertyKey);
        data.method = "put";
        Reflect.defineMetadata(HTTP_INFO_KEY, {...data}, target, wa(propertyKey));
    }
}
export const Delete = (path?: string) => {
    return function (target: any, propertyKey: PropertyKey) {
        const data: HttpInfo = Reflect.getMetadata(HTTP_INFO_KEY, target, wa(propertyKey)) as HttpInfo || {};
        data.path = path || '/' + wa(propertyKey);
        data.method = "delete";
        Reflect.defineMetadata(HTTP_INFO_KEY, {...data}, target, wa(propertyKey));
    }
}


export const Use = (path?: string) => {
    return function (target: any, propertyKey: PropertyKey) {
        const data = Reflect.getMetadata(HTTP_INFO_KEY, target, wa(propertyKey)) as HttpInfo || {};
        data.path = path || '/' + wa(propertyKey);
        data.method = "use";
        Reflect.defineMetadata(HTTP_INFO_KEY, {...data}, target, wa(propertyKey))
    }
}

export const Middleware = (middleware: any) => {
    return function (target: any, propertyKey: PropertyKey) {
        const data: HttpInfo = Reflect.getMetadata(HTTP_INFO_KEY, target, wa(propertyKey)) as HttpInfo || {};
        data.data = data.data || {};
        if (!data.data.middlewares) {
            data.data.middlewares = [];
        }
        if (typeof middleware === 'function') {
            data.data.middlewares.push(middleware);
        } else {
            throw new BadRequestError("Middleware must be a function");
        }
        Reflect.defineMetadata(HTTP_INFO_KEY, {...data}, target, wa(propertyKey));
    }
}

export const useAuth = (auth: SecurityScheme) => {
    return function (target: any, propertyKey: PropertyKey) {
        const data: HttpInfo = Reflect.getMetadata(HTTP_INFO_KEY, target, wa(propertyKey)) as HttpInfo || {};
        data.data = data.data || {};
        if (!data.data.isAuth) {
            data.data.isAuth = [];
        }
        if (auth instanceof SecurityScheme) {
            data.data.isAuth.push(auth);
        } else {
            throw new Error("Auth must be an instance of SecurityScheme");
        }
        Reflect.defineMetadata(HTTP_INFO_KEY, {...data}, target, wa(propertyKey));
    }
}

export const Tags = (tags: string[]) => {
    return function (target: any, propertyKey: PropertyKey) {
        const data: HttpInfo = Reflect.getMetadata(HTTP_INFO_KEY, target, wa(propertyKey)) as HttpInfo || {};
        data.data = data.data || {};
        data.data.tags = tags;
        Reflect.defineMetadata(HTTP_INFO_KEY, {...data}, target, wa(propertyKey));
    }
}

export interface RespData {
    statusCode?: number,
    statusMess?: string
}

export const ApiRequestStatus = (respData: RespData) => {
    return function (target: any) {
        Reflect.defineMetadata(HTTP_RESP_KEY, respData, target)
    }
}

export const Summary = (summary: string) => {
    return function (target: any, propertyKey: PropertyKey) {
        const data: HttpInfo = Reflect.getMetadata(HTTP_INFO_KEY, target, wa(propertyKey)) as HttpInfo || {};
        data.data = data.data || {};
        data.data.summary = summary;
        Reflect.defineMetadata(HTTP_INFO_KEY, {...data}, target, wa(propertyKey));
    }
}

export const Description = (description: string) => {
    return function (target: any, propertyKey: PropertyKey) {
        const data: HttpInfo = Reflect.getMetadata(HTTP_INFO_KEY, target, wa(propertyKey)) as HttpInfo || {};
        data.data = data.data || {};
        data.data.description = description;
        Reflect.defineMetadata(HTTP_INFO_KEY, {...data}, target, wa(propertyKey));
    }
}

