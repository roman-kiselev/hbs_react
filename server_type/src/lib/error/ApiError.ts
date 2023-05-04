import { Response } from "express";

class ApiError extends Error {
    status: number;
    message: string;
    data?: any;
    constructor(status: number, message: string, data?: any) {
        super();
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static badRequest(message: string, data?: any) {
        return new ApiError(400, message, data);
    }

    static unauthorized(message: string, data?: any) {
        return new ApiError(401, message, data);
    }

    static forbidden(message: string, data?: any) {
        return new ApiError(403, message, data);
    }

    static notFound(message: string, data?: any) {
        return new ApiError(404, message, data);
    }

    static serverError(message: string) {
        return new ApiError(500, message);
    }

    static created(message: string, data?: any) {
        return new ApiError(201, message, data);
    }

    static ok(message: string, data?: any) {
        return new ApiError(200, message, data);
    }

    static handle(err: ApiError, res: Response) {
        const { status, message, data } = err;
        res.status(status).json({
            message,
            data,
        });
    }
}

export default ApiError;
