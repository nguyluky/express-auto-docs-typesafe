import { NextFunction , Response, Request} from "express";



export default function format_res(req: Request, res: Response, next: NextFunction) {
    const oldSend = res.json;
    
    res.json = function(content: any) {
        content = {
            code: res.statusCode,
            message: res.statusMessage || "success",
            data: content
        }
        return oldSend.call(res, content);
    }
    next()
}
