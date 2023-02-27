/*
*  Здесь подключаемся к базе данных
*  данные лучше взять из файла .env
*  (пока не подключены)
* */

import dotenv from "dotenv";
dotenv.config()
import {Sequelize} from "sequelize";


const sequelize = new Sequelize(process.env.DATABASE,process.env.USER_NAME, process.env.PASSWORD, {
    dialect: "mysql",
    host: process.env.HOST,
    port: process.env.PORT_DB,
    define: {

    }
});


export default sequelize;