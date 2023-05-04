import { Response } from "express";

class ApiError extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message: string) {
        return new ApiError(400, message);
    }

    static unauthorized(message: string) {
        return new ApiError(401, message);
    }

    static forbidden(message: string) {
        return new ApiError(403, message);
    }

    static notFound(message: string) {
        return new ApiError(404, message);
    }

    static serverError(message: string) {
        return new ApiError(500, message);
    }

    static created(message: string) {
        return new ApiError(201, message);
    }

    static ok(message: string) {
        return new ApiError(200, message);
    }

    static handle(err: ApiError, res: Response) {
        const { status, message } = err;
        res.status(status).json({
            message,
        });
    }
}

export default ApiError;
