import sequelize from "../db.js";
import { Sequelize } from "sequelize";
import Brands from "./Brands.js";
import Meters from "./Meters.js";
import Devices from "./Devices.js";

class User extends Sequelize.Model {}
User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "users",
    }
);

class Role extends Sequelize.Model {}
Role.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "role",
    }
);

class UsersRoles extends Sequelize.Model {}
UsersRoles.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "users_role",
    }
);
User.belongsToMany(Role, { through: UsersRoles });
Role.belongsToMany(User, { through: UsersRoles });

class ObjectBuilds extends Sequelize.Model {}
ObjectBuilds.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        img: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "object_builds",
    }
);

class MainAddMeter extends Sequelize.Model {}
MainAddMeter.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        section: {
            type: Sequelize.BIGINT,
            allowNull: true,
        },
        floor: {
            type: Sequelize.BIGINT,
            allowNull: true,
        },
        flat: {
            type: Sequelize.BIGINT,
            allowNull: true,
        },
        office: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        line: {
            type: Sequelize.BIGINT,
            allowNull: true,
        },
        typeMeter: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        numberMeter: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        sumMeter: {
            type: Sequelize.FLOAT(11),
            allowNull: true,
        },
        numberKdl: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: "0",
        },
        numberAsr: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: "0",
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "main_meter",
    }
);

ObjectBuilds.hasMany(MainAddMeter);
MainAddMeter.belongsTo(ObjectBuilds);
User.hasMany(MainAddMeter);
MainAddMeter.belongsTo(User);

// Создаём связь брендов с счётчиками и устройствами
// У брендов много счётчиков
Brands.hasMany(Meters);
// У брендов много устройств
Brands.hasMany(Devices);
// Связь с брендами
// У счётчиков только один бренд
Meters.belongsTo(Brands);
// Связь с брендами
// У устройств только один бренд
Devices.belongsTo(Brands);

export default {
    User,
    ObjectBuilds,
    Role,
    UsersRoles,
    MainAddMeter,
    Brands,
    Devices,
    Meters,
};
