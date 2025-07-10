import { ErrorRequestHandler } from "express";
import env from "../env";
import { ApiError } from "../utils/exception";
import { Logger } from "../utils/logger";


const logger = new Logger('ERR_HANDLER');
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({ 
            code: err.statusCode,
            message: err.message,
            name: err.name
        });
        return
    }

    // Handle other errors
    if (env.NODE_ENV === 'development') {
        const { method, originalUrl } = req;
        logger.error(`ERROR: ${method} ${originalUrl}`, {
            context: {
                method: req.method,
                url: req.originalUrl,
                body: req.body,
                query: req.query,
                params: req.params
            }
        });
        logger.error(`${err.stack}`)
    }
    res.status(500).json({
        code: 500,
        message: 'Internal Server Error',
        name: 'InternalServerError',
        ...(err instanceof Error ? { stack: err.stack } : {})
    });
    return
}