import { Sequelize } from "sequelize";
import sequelize from "../db.js";
import Devices from "./Devices.js";
import Meters from "./Meters.js";

const Brands = sequelize.define("brands", {
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

Brands.createBrands = async ({ name }) => {
    try {
        const brand = await Brands.create({ name });
        if (!brand) {
            throw new Error("Бренд не добавлен");
        }
        return { brand };
    } catch (e) {
        console.error(e);
        return { error: e.message, status: 404 };
    }
};

Brands.getOneBrandById = async (id) => {
    try {
        const brand = await Brands.findByPk(id);
        if (!brand) {
            throw new Error("Бренд не найден");
        }
        return { brand };
    } catch (e) {
        console.error(e);
        return { error: e.message, status: 404 };
    }
};

Brands.getAllBrands = async () => {
    try {
        const brands = await Brands.findAll();
        if (brands.length === 0) {
            throw new Error("Бренды не найдены");
        }
        return { brands };
    } catch (e) {
        console.error(e);
        return { error: e.message, status: 404 };
    }
};

Brands.deleteBrands = async (id) => {
    try {
        const brand = await Brands.findByPk(id);
        if (!brand) {
            throw new Error("Ошибка при удалении бренда");
        }
        await Brands.destroy({ where: { id } });

        return { brand };
    } catch (e) {
        console.error(e);
        return { error: e.message, status: 404 };
    }
};

Brands.updateBrands = async ({ id, name }) => {
    try {
        const brand = await Brands.findByPk(id);
        if (!brand) {
            throw new Error("Ошибка редактирования бренда");
        }
        await Brands.update({ name }, { where: { id } });
        const newBrand = await Brands.findByPk(id);

        return { newBrand };
    } catch (e) {
        console.error(e);
        return { error: e.message, status: 404 };
    }
};

export default Brands;
