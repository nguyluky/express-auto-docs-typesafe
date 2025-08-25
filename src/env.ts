

import { IsEnum, IsNumber, IsString, toSchema } from '@lib/type_declaration';
import { config } from 'dotenv';

class Env {
    @IsString()
    DATABASE_URL: string;

    @IsNumber({ coerce: true })
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
    EMAIL_SECRET: string;

    @IsString()
    REFRESH_TOKEN_EXPIRATION: string = "1y"

    @IsEnum({
        value: ['development', 'production']
    })
    NODE_ENV: string = "development";

    @IsString()
    CLOUDINARY_CLOUD_NAME: string;

    @IsString()
    CLOUDINARY_API_KEY: string;

    @IsString()
    CLOUDINARY_API_SECRET: string;


}

const EnvShema = toSchema(Env)!;

config()

const parseEnv = EnvShema.safeParse(process.env)

if (!parseEnv.success) {
    // format the error messages

    console.error("Environment variable validation failed:");

    parseEnv.error.issues.forEach(error => {
        console.error(`- ${error.path.join('.')} : ${error.message}`);
    });
    console.error("Please check your .env file or environment variables.");
    
    process.exit(1);
}

const env = (parseEnv.data as any) as Env;

export default env;

