import { ApiRequestStatus } from "@lib/httpMethod";
import { IsNumber } from "@lib/type_declaration";
import { Request } from "express";


export class GetCourseByIdParams {
    @IsNumber()
    id: number;
}


export @ApiRequestStatus({
    statusCode: 200, 
    statusMess: "OK"
}) class GetCourseByIdRes {

}


export const schema = {
    param: GetCourseByIdParams,
    res: [GetCourseByIdRes]
}

export type Req = Request<any, any, any, GetCourseByIdParams>

