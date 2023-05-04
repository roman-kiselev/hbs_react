import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
    message: string;
}

export const ErrorHandlerMiddleware = (
    err: Error,
    req: Request,
    res: Response<ErrorResponse>,
    next: NextFunction
) => {
    console.error(err.stack);
    res.status(500).json({ message: "Ошибка сервера" });
};
