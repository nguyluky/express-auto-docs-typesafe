import { toExpressRouter, toRouterSchema } from "@lib/toRouter";
import { ApiRouter } from "./rootRouter";
import SwaggerController from "./swagger/controller";


const routerSchema = toRouterSchema(ApiRouter)
export const apiRouter = toExpressRouter(routerSchema);
const swaggerSchema = toRouterSchema(SwaggerController.bind(null, routerSchema))
export const swaggerRouter = toExpressRouter(swaggerSchema);
