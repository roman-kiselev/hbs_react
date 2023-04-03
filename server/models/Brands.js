import { Sequelize } from "sequelize/types";
import sequelize from "../db";

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
    const brands = await Brands.create({ name });
    return brands;
  } catch (e) {
    console.error(e);
  }
};

Brands.getOneBrandById = async (id) => {
  try {
    const brands = await Brands.findByPk(id);
    return brands;
  } catch (e) {
    console.error(e);
  }
};

Brands.getAllBrands = async () => {
  try {
    const brands = await Brands.findAll();
    return brands;
  } catch (e) {
    console.error(e);
  }
};

Brands.deleteBrands = async (id) => {
  try {
    const brands = await Brands.destroy({ where: { id } });
    return brands;
  } catch (e) {
    console.error(e);
  }
};

Brands.updateBrands = async ({ id, name }) => {
  try {
    const brands = await Brands.update({ name }, { where: { id } });
    return brands;
  } catch (e) {
    console.error(e);
  }
};

export default Brands;
