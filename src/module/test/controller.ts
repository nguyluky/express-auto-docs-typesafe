import { Description, Get, IsAuth, Summary } from "@lib/httpMethod";
import { Validate } from "@lib/validate";
import * as getTestType from "./types/getTest.type";
import * as getTestWithAuthType from "./types/getTestWithAuth.type";

export default class TestController {

    @Get("/")
    @Validate(getTestType.schema)
    @Summary("Test Endpoint")
    @Description("This is a test endpoint that returns a simple message.")
    async getTest(req: getTestType.Req) {
        return "hello world";
    }

    @Get("/")
    @Validate(getTestWithAuthType.schema)
    @IsAuth()
    @Summary("Test Endpoint with Auth")
    @Description("This is a test endpoint that requires authentication and returns a simple message.")
    async getTestWithAuth(req: getTestWithAuthType.Req) {
        throw new Error();
    }

}
