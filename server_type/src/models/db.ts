import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { User, Role, UsersRole } from "./user";
import { ObjectsBuilds, Sections, Floors } from "./objects";
import MainAddMeter from "./mainTable";
dotenv.config();

const db = new Sequelize(
    process.env.DATABASE,
    process.env.USER_NAME,
    process.env.PASSWORD_DB,
    {
        host: process.env.HOST,
        port: Number(process.env.PORT_DB),
        dialect: "mysql",
        define: {},
        models: [
            User,
            Role,
            UsersRole,
            ObjectsBuilds,
            Sections,
            Floors,
            MainAddMeter,
        ],
    }
);

export default db;
