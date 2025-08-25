// TODO: 
// - [x] convert class declaration to routerSchema
// - [x] convert routerSchema to express router
// - [x] convert routerSchema to swagger schema
// - test

import { ZodBadRequestError } from "@utils/exception";
import { expressToSwaggerPath } from "@utils/express2swaggerPath";
import { accessTokenPayload } from "@utils/jwt";
import { NextFunction, Request, Response, Router } from "express";
import z, { globalRegistry } from "zod/v4";
import { HTTP_INFO_KEY, HTTP_RESP_KEY, HttpInfo, RespData } from "./httpMethod";
import { getContextType, toSchema } from "./type_declaration";
import { ApiSchemas, SCHEMA_RES_KEY } from "./validate";

export type RequestWithUser = accessTokenPayload;



const toJSONSchema = (schema: z.ZodTypeAny) => {
    // @ts-ignore
    const schema_ = z.toJSONSchema(schema, {
        reused: "ref",
        uri: (id: string) => `#/components/schemas/${id}`,
        external: {
            registry: globalRegistry,
            uri: (id: string) => `#/components/schemas/${id}`,
            defs: {}
        }
    });

    return schema_
}

interface ZodApiSchemas {
    [key: string]: {
        contextType?: string;
        schema: z.ZodTypeAny;
        schemaClass: any | any[];
    }
}

export interface RouterSchema {
    httpInfo: HttpInfo;
    target_class: any;
    handler: any;
    subRouter?: RouterSchema[];
    schema?: ZodApiSchemas;
    errors?: Error[]
}

function convertToZodSchemas(schemas: ApiSchemas): ZodApiSchemas {
    const schema_zod: ZodApiSchemas = {};
    for (const [key, value] of Object.entries(schemas || {})) {
        if (Array.isArray(value)) {
            const sch = value.map((e) => toSchema(e)).filter((e) => e !== null);
            schema_zod[key] = {
                schemaClass: value,
                schema: z.union(sch)
            }
        } else {
            const sch = toSchema(value);
            const contextType = getContextType(value);
            if (!sch) continue;

            schema_zod[key] = {
                contextType: contextType,
                schema: sch,
                schemaClass: value,
            }
        }
    }
    return schema_zod;
}


export function toRouterSchema(target: any): RouterSchema[] {
    const routerSchema: RouterSchema[] = [];
    const controller = new target() as any;

    const methods = [
        ...Object.getOwnPropertyNames(Object.getPrototypeOf(controller)),
        ...Object.getOwnPropertyNames(controller)
    ]

    for (const method of methods) {
        const httpInfo: HttpInfo = Reflect.getMetadata(HTTP_INFO_KEY, controller, method) as HttpInfo;
        const apiSchema: ApiSchemas = Reflect.getMetadata(SCHEMA_RES_KEY, controller, method) as ApiSchemas;
        const zodSchema = convertToZodSchemas(apiSchema);

        if (!httpInfo) continue;

        if (httpInfo.method == 'use') {
            const subRouterSchema: RouterSchema[] = toRouterSchema(controller[method]);
            const schema: RouterSchema = {
                httpInfo,
                target_class: target,
                handler: controller[method].bind(controller),
                subRouter: subRouterSchema
            };
            routerSchema.push(schema);
        }

        else {
            const errors = (Reflect.getMetadata("exception", controller, method) as Error[]) || [];
            const schema: RouterSchema = {
                httpInfo,
                target_class: target,
                handler: controller[method].bind(controller),
                schema: zodSchema,
                errors: errors
            };
            routerSchema.push(schema);
        }
    }
    return routerSchema;
}

// Validate request data
function validateRequest(
    schema_zod: ZodApiSchemas,
    req: Request
) {
    const newData = {
        body: req.body,
        query: req.query,
        params: req.params,
    }
    for (const [key, schema] of Object.entries(schema_zod)) {
        if (key === "res") continue;
        const data = schema.schema.safeParse((req as any)[key] || {});
        if (!data.success) {
            console.error("Validation error:", (req as any)[key]);
            throw new ZodBadRequestError(data.error);
        }

        (newData as any)[key] = data.data;
    }

    return newData;
}

async function handleRoute(
    classInstance: any,
    handler: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const data = await handler.call(classInstance, req, next);
    const respDeco = Reflect.getMetadata(HTTP_RESP_KEY, data.constructor) as RespData;
    if (respDeco) {
        return res.json({
            code: respDeco?.statusCode || 200,
            message: respDeco?.statusMess || "OK",
            data,
        });
    }
    else {
        res.send(data);
    }
}

export function toExpressRouter(routerSchema: RouterSchema[]): Router {
    const expressRouter = Router();

    for (const schema of routerSchema) {
        const { httpInfo, handler, subRouter, schema: schemaZod } = schema;

        if (httpInfo.method === 'use') {
            const subRouterExpress = toExpressRouter(subRouter || []);
            expressRouter.use(httpInfo.path, subRouterExpress);
        }
        else {
            const method = httpInfo.method.toLowerCase();
            const validateWrapper = async (req: Request, res: Response, next: any) => {
                const validatedData = validateRequest(schemaZod || {}, req);

                const _req = new Proxy(req, {
                    get(target, prop) {
                        if (prop in validatedData) {
                            return (validatedData as any)[prop];
                        }
                        return (target as any)[prop];
                    }
                });

                await handleRoute(schema.target_class, handler, _req, res, next);

                // TODO: how to delete this proxy?
            }

            if (method === 'get') {
                expressRouter.get(httpInfo.path, validateWrapper);
            } else if (method === 'post') {
                expressRouter.post(httpInfo.path, validateWrapper);
            } else if (method === 'put') {
                expressRouter.put(httpInfo.path, validateWrapper);
            } else if (method === 'delete') {
                expressRouter.delete(httpInfo.path, validateWrapper);
            }
        }
    }


    return expressRouter;
}


export function toSwaggerSchema(routerSchema: RouterSchema[]): any {
    const swaggerSchemas: any = {};

    for (const schema of routerSchema) {
        const { httpInfo, handler, target_class, schema: zodSchema, errors } = schema;

        if (httpInfo.method === 'use') {
            const subSwaggerSchemas = toSwaggerSchema(schema.subRouter || []);
            for (const [path, methods] of Object.entries(subSwaggerSchemas)) {
                const newPath = expressToSwaggerPath(httpInfo.path) + path;
                if (!swaggerSchemas[newPath]) {
                    swaggerSchemas[newPath] = {};
                }
                Object.assign(swaggerSchemas[newPath], methods);
            }
            continue;
        }

        const method = httpInfo.method.toLowerCase();
        const tags = httpInfo.data?.tags || [target_class.name];
        const swaggerPath = expressToSwaggerPath(httpInfo.path);
        if (!swaggerSchemas[swaggerPath]) {
            swaggerSchemas[swaggerPath] = {};
        }

        swaggerSchemas[swaggerPath][method] = {
            tags: tags,
            summary: httpInfo.data?.summary,
            description: httpInfo.data?.description,
        };


        if (zodSchema?.body) {
            swaggerSchemas[swaggerPath][method].requestBody = {
                content: {
                    [zodSchema.body.contextType || "application/json"]: {
                        schema: toJSONSchema(zodSchema.body.schema)
                    }
                },
                required: true
            };
        }

        if (zodSchema?.query) {
            swaggerSchemas[swaggerPath][method].parameters = swaggerSchemas[swaggerPath][method].parameters || [];
            for (const key of Object.keys((zodSchema.query.schema as any).shape)) {
                const paramSchema = (zodSchema.query.schema as any).shape[key];
                swaggerSchemas[swaggerPath][method].parameters.push({
                    name: key,
                    in: "query",
                    schema: toJSONSchema(paramSchema)
                });
            }
        }

        if (zodSchema?.params) {
            swaggerSchemas[swaggerPath][method].parameters = swaggerSchemas[swaggerPath][method].parameters || [];
            for (const key of Object.keys((zodSchema.params.schema as any).shape)) {
                const paramSchema = (zodSchema.params.schema as any).shape[key];
                swaggerSchemas[swaggerPath][method].parameters.push({
                    name: key,
                    in: "path",
                    required: true,
                    schema: toJSONSchema(paramSchema)
                });
            }
        }

        // Response schema

        if (zodSchema?.res) {
            swaggerSchemas[swaggerPath][method].responses = swaggerSchemas[swaggerPath][method].responses || {};

            let resSchemas = zodSchema.res.schemaClass;
            if (!Array.isArray(resSchemas)) {
                resSchemas = [resSchemas];
            }

            for (const resSchema of resSchemas) {
                const respDeco = Reflect.getMetadata(HTTP_RESP_KEY, resSchema) as RespData;
                const statusCode = respDeco?.statusCode || 200;
                const statusMess = respDeco?.statusMess || "OK";
                const zodSchema = toSchema(resSchema);
                // console.log("Zod schema:", zodSchema);
                swaggerSchemas[swaggerPath][method].responses[statusCode] = {
                    description: statusMess,
                    content: {
                        "application/json": {
                            schema: {
                                $schema: "http://json-schema.org/draft-07/schema#",
                                type: "object",
                                properties: {
                                    code: {
                                        type: "integer",
                                        description: "HTTP status code of the error",
                                        minimum: 200,
                                        maximum: 300,
                                    },
                                    message: {
                                        type: "string",
                                        description: "Human-readable error message",
                                    },
                                    data: zodSchema ? toJSONSchema(zodSchema) : undefined
                                },
                                required: [],
                            },

                        }
                    }
                };
            }

            // Add error responses
            for (const classError of errors || []) {
                if (!classError) continue;
                const errorDeco = Reflect.getMetadata(HTTP_RESP_KEY, classError) as RespData;
                const statusCode = errorDeco?.statusCode || 500;
                const statusMess = errorDeco?.statusMess || "Internal Server Error";
                swaggerSchemas[swaggerPath][method].responses[statusCode] = {
                    content: {
                        "application/json": {
                            description: statusMess,
                            schema: {
                                $schema: "http://json-schema.org/draft-07/schema#",
                                title: "ApiErrorResponse",
                                type: "object",
                                properties: {
                                    code: {
                                        type: "integer",
                                        description: "HTTP status code of the error",
                                        minimum: 400,
                                        maximum: 599,
                                    },
                                    message: {
                                        type: "string",
                                        description: "Human-readable error message",
                                    },
                                    name: {
                                        type: "string",
                                        description: "Error class name",
                                    },
                                },
                                required: [],
                            },
                        },
                    },
                }
            }
        }

        // Add security
        if (httpInfo.data?.isAuth) {
            swaggerSchemas[swaggerPath][method].security = swaggerSchemas[swaggerPath][method].security || [];
            swaggerSchemas[swaggerPath][method].security.push({
                BearerAuth: []
            });
        // add respone if user not login

            swaggerSchemas[swaggerPath][method].responses = swaggerSchemas[swaggerPath][method].responses || {};
            swaggerSchemas[swaggerPath][method].responses[401] = {
                description: "Unauthorized",
                content: {
                    "application/json": {
                        schema: {
                            $schema: "http://json-schema.org/draft-07/schema#",
                            type: "object",
                            properties: {
                                code: { type: "integer", description: "HTTP status code of the error", minimum: 400, maximum: 599 },
                                message: { type: "string", description: "Human-readable error message" },
                            },
                            required: [],
                        }
                    }
                }
            };
        }
    }


    return swaggerSchemas;
}

