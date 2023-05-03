import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
    process.env.DATABASE,
    process.env.USER_NAME,
    process.env.PASSWORD_DB,
    {
        host: process.env.HOST,
        port: Number(process.env.PORT),
        dialect: "mysql",
        define: {},
        logging: true,
    }
);

export default db;
