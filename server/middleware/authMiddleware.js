import jwt from "jsonwebtoken";
import * as dotenv from "dotenv"
dotenv.config()
import chalk from "chalk";

export default (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    try {

        console.log(chalk.blue(req.headers.authorization));
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({message: "Пользователь не авторизован"})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded;
        next()
    } catch (e) {
        console.log(chalk.red(e))
        res.status(401).json({message: "Пользователь не авторизован _______"})
    }
}