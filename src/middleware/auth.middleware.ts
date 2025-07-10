import { UnauthorizedError } from "@utils/exception";
import { verifyAccessToken } from "@utils/jwt";

import { NextFunction, Response , Request} from "express";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new UnauthorizedError();
    }
    
    const token = authorization.split(' ')[1];
    if (!token) {
        throw new UnauthorizedError();
    }

    try {
        const {user} = await verifyAccessToken(token);
        if (!user) {
            throw new UnauthorizedError();
        }
        (req as any).user = user;
        next();
    } catch (error) {
        throw new UnauthorizedError('Invalid or expired token');
    }
}



