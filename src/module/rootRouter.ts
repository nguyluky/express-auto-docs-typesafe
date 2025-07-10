

import { Get, Use } from "@lib/httpMethod";
import AuthController from "./auth/controller";
import {Response, Request} from "express"
import CourseController from "./courses/controller";
import SwaggerController from "./swagger/controller";



class RootRouter {
    @Use()
    auth = AuthController;

    @Use()
    courses = CourseController;

    @Get()
    test(req: Request) {
        return "hello 1"
    }

    @Get("/")
    test1(req: Request) {
        return "test 1"
    }
}


export class ApiRouter {
    @Use()
    api = RootRouter
}
