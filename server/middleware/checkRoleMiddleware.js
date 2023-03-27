import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";

export default (role) => {
    return (req, res, next) => {
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
            decoded.role.every((r) => {
                if (r.name !== role) {
                    return res.status(403).json({ message: "Нет доступа" });
                }
            });
            // if (decoded.role !== role) {
            //     return res.status(403).json({message: 'Нет доступа'})
            // }

            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).json({
                message: "Пользователь не авторизован _______",
            });
        }
    };
};
