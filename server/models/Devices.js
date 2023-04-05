import { Sequelize } from "sequelize";
import sequelize from "../db.js";
import Brands from "./Brands.js";

const Devices = sequelize.define("devices", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
});

Devices.createDevice = async ({ name }) => {
    try {
        const device = await Devices.create({ name });
        return device;
    } catch (e) {
        console.error(e);
    }
};

Devices.getOneDeviceById = async (id) => {
    try {
        const device = await Devices.findByPk(id);
        return device;
    } catch (e) {
        console.error(e);
    }
};

Devices.getAllDevices = async () => {
    try {
        const devices = await Devices.findAll();
        return devices;
    } catch (e) {
        console.error(e);
    }
};

Devices.deleteDevice = async (id) => {
    try {
        const device = await Devices.destroy({ where: { id } });
        return device;
    } catch (e) {
        console.error(e);
    }
};

Devices.updateDevice = async ({ id, name }) => {
    try {
        const device = await Devices.update({ name }, { where: { id } });
        return device;
    } catch (e) {
        console.error(e);
    }
};

export default Devices;
