/*
 *  Здесь подключаемся к базе данных
 *  данные лучше взять из файла .env
 *  (пока не подключены)
 * */

import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER_NAME,
    process.env.PASSWORD_DB,
    {
        dialect: "mysql",
        host: process.env.HOST,
        port: process.env.PORT_DB,
        logging: true,
        define: {},
    }
);

export default sequelize;
