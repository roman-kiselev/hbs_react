import sequelize from "../db.js";
import { Sequelize } from "sequelize";
import pkg from "sequelize";
const { DataTypes } = pkg;
import Brands from "./Brands.js";
import Meters from "./Meters.js";
import Devices from "./Devices.js";
import Section from "./Section.js";
import Parameters from "./Parameters.js";
import Property from "./Property.js";
import Flats from "./Flats.js";
import Floors from "./Floors.js";
import Office from "./Office.js";

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

class ObjectBuildSettingUp extends Sequelize.Model {}
ObjectBuildSettingUp.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(
                "Работает",
                "Не работает",
                "Отключен",
                "Не определен",
                "Проблемы связи",
                "Села батарея"
            ),
            defaultValue: "Работает",
        },
        replacement: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        comment: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: "object_build_setting_up",
    }
);

class MetersLogs extends Sequelize.Model {}
MetersLogs.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "meters_logs",
    }
);

MetersLogs.getAllMeters = async () => {
    return await MetersLogs.findAll();
};

MainAddMeter.hasOne(ObjectBuildSettingUp);
ObjectBuildSettingUp.belongsTo(MainAddMeter);

ObjectBuildSettingUp.hasMany(MetersLogs);
MetersLogs.belongsTo(ObjectBuildSettingUp);

ObjectBuilds.hasMany(MainAddMeter);
MainAddMeter.belongsTo(ObjectBuilds);
User.hasMany(MainAddMeter);
MainAddMeter.belongsTo(User);

// Создаём связь брендов с счётчиками и устройствами
// У одного бренда много счётчиков
Brands.hasMany(Meters);
// У одного бренда много устройств
Brands.hasMany(Devices);
// Связь с брендами
// А у одного счётчика много брендов
Meters.belongsTo(Brands);
// Связь с брендами
// А у одного устройства много брендов
Devices.belongsTo(Brands);

// У одного дома много секций
ObjectBuilds.hasMany(Section);
// А у одной секции один дом
Section.belongsTo(ObjectBuilds);

Section.hasMany(Flats);
Flats.belongsTo(Section);

Section.hasMany(Office);
Office.belongsTo(Section);

Section.hasMany(Floors);
Floors.belongsTo(Section);

Floors.hasMany(Flats);
Flats.belongsTo(Floors);

Floors.hasMany(Office);
Office.belongsTo(Floors);

//  У одного параметра много свойств
Parameters.hasOne(Property);
// А у одного свойства один параметр
Property.belongsTo(Parameters);

export default {
    User,
    ObjectBuilds,
    Role,
    UsersRoles,
    MainAddMeter,
    Brands,
    Devices,
    Meters,
    Section,
    Parameters,
    Property,
    Flats,
    Floors,
    Office,
    ObjectBuildSettingUp,
    MetersLogs,
};
