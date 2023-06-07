import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest, IRoleCreate } from "../interfaces";
// Функция принимает 2 массива
// один массив ищет в другом и возвращает true или false
const checkRoles = (roles: string[], userRoles: IRoleCreate[]) => {
    let result: boolean = false;
    roles.forEach((role: string) => {
        userRoles.forEach((userRole: IRoleCreate) => {
            if (role === userRole.name) {
                result = true;
            }
        });
    });

    return result;
};

export default (roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization.split(" ")[1];

            if (!token) {
                return res
                    .status(401)
                    .json({ message: "Пользователь не авторизован" });
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            // Роли содержатся в массиве
            // Проверить если в массиве нет нужной роли , ответ нет доступа
            const isRole = checkRoles(roles, decoded.roles);
            if (!isRole) {
                return res.status(403).json({ message: "Нет доступа" });
            }
            req.user = decoded;
            next();
        } catch (e) {
            return res.status(401).json({
                message: "Пользователь не авторизован _______",
            });
        }
    };
};
