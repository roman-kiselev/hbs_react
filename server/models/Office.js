import { Sequelize } from "sequelize";
import sequelize from "../db.js";

const Office = sequelize.define("office", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
});

export default Office;
