import { Sequelize } from "sequelize";
import sequelize from "../db.js";

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
        if (!device) {
            throw new Error("Устройство не добавлено");
        }
        return { device };
    } catch (e) {
        console.error(e);
        return { error: e.message, status: 404 };
    }
};

Devices.getOneDeviceById = async (id) => {
    try {
        const device = await Devices.findByPk(id);
        if (!device) {
            throw new Error("Устройство не найдено");
        }
        return device;
    } catch (e) {
        console.error(e);
        return { error: e.message, status: 404 };
    }
};

Devices.getAllDevices = async () => {
    try {
        const devices = await Devices.findAll();
        if (devices.length === 0) {
            throw new Error("Устройства не найдены");
        }
        return { devices };
    } catch (e) {
        console.error(e);
        return { error: e.message, status: 404 };
    }
};

Devices.deleteDevice = async (id) => {
    try {
        const device = await Devices.findByPk(id);
        if (!device) {
            throw new Error("Устройство не найдено");
        }
        await Devices.destroy({ where: { id } });
        return { device };
    } catch (e) {
        console.error(e);
        return { error: e.message, status: 404 };
    }
};

Devices.updateDevice = async ({ id, name }) => {
    try {
        const device = await Devices.findByPk(id);
        if (!device) {
            throw new Error("Устройство не найдено");
        }
        const newDevice = await Devices.update({ name }, { where: { id } });
        if (!newDevice) {
            throw new Error("Устройство не обновлено");
        }
        return { device };
    } catch (e) {
        console.error(e);
        return { error: e.message, status: 404 };
    }
};

export default Devices;
