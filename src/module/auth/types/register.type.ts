
import { ApiRequestStatus } from "@lib/httpMethod";
import { Formats, IsString, toSchema } from "@lib/type_declaration";
import { ApiSchemas } from "@lib/validate";
import { Request, Response} from "express"

export class RegisterBody {
     @IsString()
     userName: string;

     @IsString()
     password: string;
    
     @IsString({format: Formats.email})
     email: string;
}



export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
})
class RegisterSuccess {

}

export const schema: ApiSchemas = {
    body: RegisterBody,
    res: [RegisterSuccess]
}
export type Res = Response<any>;
export type Req = Request<any, any, RegisterBody, any>;
