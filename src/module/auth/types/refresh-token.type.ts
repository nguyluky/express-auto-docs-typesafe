import { ApiRequestStatus } from "@lib/httpMethod";
import { IsString } from "@lib/type_declaration";
import { Request, Response} from "express"

export class RefreshTokenBody {
    @IsString()
    refresh_token: string;
}


export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Refresh token success"
})
class RefreshTokenSuccess {
    @IsString()
    access_token: string;

    constructor(access_token: string) {
        this.access_token = access_token;
    }
}

export const schema = {
    body: RefreshTokenBody,
    res: [RefreshTokenSuccess],
};


export type Res = Response<any>;
export type Req = Request<any, any, RefreshTokenBody, any>;
