import { ApiRequestStatus } from "@lib/httpMethod";
import { IsString } from "@lib/type_declaration";
import { user } from "@prisma/client";
import { Request, Response } from "express"
import * as z from 'zod/v4'

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class Enable2FASuccess {
    @IsString()
    secret: string;
    @IsString()
    otpauth_url: string;

    constructor(secret: string, otpauth_url: string) {
        this.secret = secret;
        this.otpauth_url = otpauth_url;
    }
}


export const schema = {
    res: [Enable2FASuccess]
};
export type Res = Response<any>;
export type Req = Request<any, any, any, any> & { user: Omit<user, 'password' | 'two_factor_secret'> };
