import { Handler } from "express";
import { Logger } from "../utils/logger";


const logger = new Logger('REQ_LOG');
export const requestLogger: Handler = (req, res, next) => {
    const { method, originalUrl} = req;
    // Log response
    const oldSend = res.send;
    res.send = (content) => {
        logger.info(`Response: ${method} ${originalUrl} - Status: ${res.statusCode}`);
        return oldSend.call(res, content);
    };

    next();
}
