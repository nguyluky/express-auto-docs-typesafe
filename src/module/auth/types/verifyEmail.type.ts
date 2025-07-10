

import { ApiRequestStatus } from "@lib/httpMethod";
import { IsString, toSchema } from "@lib/type_declaration";
import { ApiSchemas } from "@lib/validate";
import { Request, Response} from "express"

export class VerifyEmail {
    @IsString()
    token: string;
}


export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "success"
})
class VerifyEmailSuccess {

}

export const schema: ApiSchemas = {
    query: VerifyEmail,
    res: [VerifyEmailSuccess ]
}
export type Res = Response<any>;
export type Req = Request<any, any, any, VerifyEmail>;
