


import { Get, Use } from "@lib/httpMethod";
import TestController from "./test/controller";


class RootRouter {
    @Use("/test")
    test = TestController
}


export class ApiRouter {
    @Use()
    api = RootRouter

    @Get("/health")
    health() {
        return "OK";
    }
}
