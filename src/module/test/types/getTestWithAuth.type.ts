
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import "reflect-metadata";

export class getTestWithAuthReqBody {}
export class getTestWithAuthReqQuery {}
export class getTestWithAuthReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getTestWithAuthRes {}

export const schema = {
    res: [getTestWithAuthRes],
    body: getTestWithAuthReqBody,
    query: getTestWithAuthReqQuery,
    params: getTestWithAuthReqParams
};

export type Req = Request<getTestWithAuthReqParams, any, getTestWithAuthReqBody, getTestWithAuthReqQuery>;
