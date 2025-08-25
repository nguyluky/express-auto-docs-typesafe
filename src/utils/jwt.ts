import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import env from "../env";

import { user } from "@prisma/client";
import { ApiError, TokenTimeoutError, TokenVerificationError } from "./exception";

export const generateTempToken = (userid: string) => {
    const token = jwt.sign( { userid }, env.TWO_FACTOR_SECRET, { expiresIn: env.TWO_FACTOR_EXPIRATION as StringValue })
    return token;
}

export const verifyTempToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        return decoded as { userid: string };
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new TokenTimeoutError();
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new TokenVerificationError();
        } else {
            throw new ApiError("An unexpected error occurred during token verification.", 500);
        }
    }
}

export const generateAccessToken = (user: user) => {
    const { password, two_factor_secret, ...userWithoutSensitiveData } = user;
    const token = jwt.sign({ user: userWithoutSensitiveData }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRATION as StringValue });
    return token;
}


export type accessTokenPayload = {    user: Omit<user, 'password' | 'two_factor_secret'> };
export const verifyAccessToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        return decoded as accessTokenPayload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new TokenTimeoutError();
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new TokenVerificationError();
        } else {
            throw new ApiError("An unexpected error occurred during token verification.", 500);
        }
    }
}


export const generateRefreshToken = (userid: string) => {
    const token = jwt.sign({ userid }, 
        env.JWT_SECRET + "refresh",
        { expiresIn: env.REFRESH_TOKEN_EXPIRATION as StringValue });
    return token;
}


export const verifyRefreshToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET + "refresh");
        return decoded as { userid: string };
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new TokenTimeoutError();
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new TokenVerificationError();
        } else {
            throw new ApiError("An unexpected error occurred during token verification.", 500);
        }
    }
}

export const generateEmailToken = (userid: string) => {
    const token = jwt.sign({userid}, env.EMAIL_SECRET, {
        expiresIn: "1h"
    })


    return token;
}


export const verifyEmailToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, env.EMAIL_SECRET)
        return decoded as {userid: string}

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new TokenTimeoutError();
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            throw new TokenVerificationError();
        }

        else {
            throw new ApiError("hummmmm", 500)
        }
    }
}
