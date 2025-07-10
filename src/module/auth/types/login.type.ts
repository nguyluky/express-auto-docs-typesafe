import { ApiRequestStatus } from "@lib/httpMethod";
import { IsString } from "@lib/type_declaration";
import { HttpResp, toDataClass } from "@lib/validate";
import { Request, Response } from "express"

class LoginBody {
    @IsString()
    userName: string;

    @IsString()
    password: string;
}

export @ApiRequestStatus({
    statusCode: 202,
    statusMess: "2FA"
})
class Req2FA {
    @IsString()
    templay_token: string;

    constructor(templay_token: string) {
        this.templay_token = templay_token;
    }
}


export class LoginSuccess {
    @IsString()
    access_token: string;

    @IsString()
    refresh_token: string;

    constructor(access_token: string, refresh_token: string) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }
}

export const schema = {
    body: LoginBody,
    res: [LoginSuccess, Req2FA],
}

export type Res = Response<InstanceType<typeof schema['res'][number]>>;
export type Req = Request<any, any, InstanceType<typeof schema['body']>, any>;
