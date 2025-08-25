
import { ApiRequestStatus } from "@lib/httpMethod";
import * as z from "zod/v4";

export @ApiRequestStatus({
    statusCode: 500,
    statusMess: "Internal server error"
})
class ApiError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ApiError";
    }
}

export @ApiRequestStatus({
    statusCode: 401,
    statusMess: "Token has expired"
})
class TokenTimeoutError extends ApiError {
    constructor() {
        super("Token has expired", 401);
        this.name = "TokenTimeoutError";
    }
}
export @ApiRequestStatus({
    statusCode: 401,
    statusMess: "Token verification failed"
})
class TokenVerificationError extends ApiError {
    constructor() {
        super("Token verification failed", 401);
        this.name = "TokenVerificationError";
    }
}
export @ApiRequestStatus({
    statusCode: 404,
    statusMess: "Resource not found"
})
class NotFoundError extends ApiError {
    constructor(message: string = "Resource not found") {
        super(message, 404);
        this.name = "NotFoundError";
    }
}
export @ApiRequestStatus({
    statusCode: 400,
    statusMess: "Bad request"
})
class BadRequestError extends ApiError {
    constructor(message: string = "Bad request") {
        super(message, 400);
        this.name = "BadRequestError";
    }
}
export @ApiRequestStatus({
    statusCode: 401,
    statusMess: "Unauthorized"
})
class UnauthorizedError extends ApiError {
    constructor(message: string = "Unauthorized") {
        super(message, 401);
        this.name = "UnauthorizedError";
    }
}
export @ApiRequestStatus({
    statusCode: 403,
    statusMess: "Forbidden"
})
class ForbiddenError extends ApiError {
    constructor(message: string = "Forbidden") {
        super(message, 403);
        this.name = "ForbiddenError";
    }
}
export @ApiRequestStatus({
    statusCode: 403,
    statusMess: "Conflict"
})
class ConflictError extends ApiError {
    constructor(message: string = "Conflict") {
        super(message, 403);
        this.name = "ConflictError"
    }
}
export @ApiRequestStatus({
    statusCode: 400,
    statusMess: "Zod validation failed"
})
class ZodBadRequestError extends ApiError {
    constructor(error: z.ZodError) {
        super(JSON.stringify(z.treeifyError(error), null, 2), 400);
        this.name = "ZodBadRequestError";
    }
}

