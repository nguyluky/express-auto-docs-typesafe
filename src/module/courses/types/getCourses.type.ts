import { ApiRequestStatus } from "@lib/httpMethod";
import { IsArray, IsNumber, IsObject, IsString, toSchema } from "@lib/type_declaration";
import { Request } from "express";


export class GetCoursesQuery {
    @IsString({optional: true})
    year: string = "2025";
    @IsNumber({optional: true})
    semester: number = 1;
}


class ds_mon {
    @IsString()
    id: string;
    @IsString()
    display_name: string = '';
}

export @ApiRequestStatus({
    statusMess: "OK",
    statusCode: 200
}) class GetCoursesResp {
    @IsNumber()
    length: number;

    @IsArray(toSchema(ds_mon))
    items: ds_mon[];

    constructor(length: number, data: ds_mon[]) {
        this.length = length;
        this.items = data;
    }
}

export const schema = {
    query: GetCoursesQuery,
    res: [GetCoursesResp]
}


export type Req = Request<any, any, any, GetCoursesQuery>;
