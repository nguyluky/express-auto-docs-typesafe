import { toRouter } from "@lib/toRouter";
import { ApiRouter } from "./rootRouter";
import SwaggerController from "./swagger/controller";

export const apiRouter = toRouter(ApiRouter);
export const swaggerRouter = toRouter(SwaggerController.bind(null, apiRouter));
// console.log(JSON.stringify((authRouter as any).swagger, null, 2))
