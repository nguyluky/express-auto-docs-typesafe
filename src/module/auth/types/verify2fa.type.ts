import { IsString, toSchema } from "@lib/type_declaration";
import { Request, Response} from "express"

export class Verify2faBody {
    @IsString()
    templay_token: string;

    @IsString()
    code: string;
}

class Verify2faSuccess {
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
    body: Verify2faBody,
    res: [Verify2faSuccess],
};
export type Res = Response<any>;
export type Req = Request<any, any, Verify2faBody, any>;
