import * as z from "zod/v4";
import { Request, Response, NextFunction } from 'express'
import { ZodBadRequestError } from '@utils/exception';
import { toSchema } from "@lib/type_declaration";
import "reflect-metadata"
import { wa } from "./PropertyKey";

export const SCHEMA_RES_KEY = "res_schema_key"

type Class_ = new () => any


export class HttpResp<T = any> {
    constructor(data: Partial<T>) {
        console.log(Object.keys(data))
        for (const key of Object.keys(data)) {

            // @ts-ignore
            console.log(key, data[key])
            // @ts-ignore
            this[key] = data[key]
        }
    }
}

export interface ApiSchemas {
    body?:  Class_ | Class_[],    
    param?: Class_ | Class_[],
    query?: Class_ | Class_[],
    res?:   HttpResp | HttpResp[]
}


export const validated_build = (schemas_zod: {[key: string]: z.ZodTypeAny}) => 
    (req: Request, res: Response, next: NextFunction) => {
    for (const [key, value] of Object.entries(schemas_zod)) {
        const data = value.safeParse((req as any)[key]);
        if (data.success) (req as any)[key] = data.data;
        else throw new ZodBadRequestError(data.error);
    }
}

export function Validate(schemas: ApiSchemas) {
    return function (target: any, key: string | ClassFieldDecoratorContext, descriptor: any) {
        // const schemas_zod : {[key: string]: z.ZodTypeAny} = {}
        // 
        // for (const [key, valu] of Object.entries(schemas)) {
        //     if (key == 'res') continue
        //     if (Array.isArray(valu)) {
        //         const sch = valu.map(e => toSchema(e))
        //         schemas_zod[key] = z.union(sch);
        //     }
        //     else {
        //         schemas_zod[key] = toSchema(valu);
        //     }
        // }

        Reflect.defineMetadata(SCHEMA_RES_KEY, schemas, target, wa(key));
    } 
}
