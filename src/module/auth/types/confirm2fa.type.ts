
import { ApiRequestStatus } from "@lib/httpMethod";
import { IsString, toSchema } from "@lib/type_declaration";
import { ApiSchemas } from "@lib/validate";
import { user } from "@prisma/client";
import { Request, Response} from "express"


export class Confirm2FABody {
    @IsString()
    secret: string;

    @IsString()
    code: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class Confirm2FAResponse {
}

export const schema:ApiSchemas= {
    body: Confirm2FABody,
    res: [Confirm2FAResponse]
};
export type Res = Response<any>;
export type Req = Request<any, any, Confirm2FABody, any> & { user: Omit<user, 'password' | 'two_factor_secret'> };
