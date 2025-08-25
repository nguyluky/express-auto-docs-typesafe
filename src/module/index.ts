import { RouterSchema, toExpressRouter, toRouterSchema } from "@lib/toRouter";
import { ApiRouter } from "./rootRouter";
import SwaggerController from "./swagger/controller";

const routerSchema = toRouterSchema(ApiRouter)
export const apiRouter = toExpressRouter(routerSchema);
const swaggerSchema = toRouterSchema(SwaggerController.bind(null, routerSchema))
export const swaggerRouter = toExpressRouter(swaggerSchema);

// log available routes
console.log(`Generated API routes`);
function logAvailableRoutes(routerSchema: RouterSchema[], index: number = 0) {
    for (const schema of routerSchema) {
        if (schema.httpInfo.method == 'use') {
            console.log(' '.repeat(index) + `- ${schema.httpInfo.path} (${schema.subRouter!.length} endpoints)`);
            logAvailableRoutes(schema.subRouter!, index + 2);
        }
        else {
            console.log(' '.repeat(index) + ` • ${schema.httpInfo.data?.isAuth ? '[' + schema.httpInfo.data?.isAuth?.map(e => e.constructor.name).join(', ') + ']' : ''} ${schema.httpInfo.method.toUpperCase()} ${schema.httpInfo.path}`);
        }
    }
}
logAvailableRoutes(routerSchema);
