import { Sequelize } from "sequelize";
import sequelize from "../db.js";

const Property = sequelize.define("property", {
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

export default Property;
