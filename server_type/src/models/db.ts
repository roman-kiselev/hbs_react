import * as dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import MainAddMeter from "./mainTable";
import { Floors, ObjectsBuilds, Sections } from "./objects";
import { Role, User, UsersRole } from "./user";
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
