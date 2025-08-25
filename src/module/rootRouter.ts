

import { Get, Use } from "@lib/httpMethod";
import { Request } from "express";



class RootRouter {

    @Get("/")
    test1(req: Request) {
        return "test 1"
    }
}


export class ApiRouter {
    @Use()
    api = RootRouter
}
