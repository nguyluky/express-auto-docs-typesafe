

import { config } from 'dotenv';
import { IsEnum, IsNumber, IsString, toSchema } from '@lib/type_declaration';

class Env {
    @IsString()
    DATABASE_URL: string;
    
    @IsNumber({coerce: true})
    PORT: number = 3000;

    @IsString()
    JWT_SECRET: string;

    @IsString()
    JWT_EXPIRATION: string = "1d";

    @IsString()
    TWO_FACTOR_SECRET: string;
    
    @IsString()
    TWO_FACTOR_EXPIRATION: string = "5m";

    @IsString()
    EMIAL_SECRET: string;

    @IsString()
    REFRESH_TOKEN_EXPIRATION: string = "1y"

    @IsEnum({
        value: ['development', 'production']
    })
    NODE_ENV: string = "development";


}

const EnvShema = toSchema(Env);

config()

const env = (EnvShema.parse(process.env) as any) as Env;

export default env;

