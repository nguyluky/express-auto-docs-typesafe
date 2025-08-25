
import { ApiRequestStatus } from "@lib/httpMethod";
import { IsString } from "@lib/type_declaration";
import { Request } from "express";
import "reflect-metadata";

export class getTestReqBody {
    @IsString()
    name: string;
}
export class getTestReqQuery {

}
export class getTestReqParams {
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getTestRes {}

export const schema = {
    res: [getTestRes],
    body: getTestReqBody,
    query: getTestReqQuery,
    params: getTestReqParams
};

export type Req = Request<getTestReqParams, any, getTestReqBody, getTestReqQuery>;
