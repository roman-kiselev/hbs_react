import { Model, Sequelize } from "sequelize-typescript";

class ObjectBuilds extends Model {}
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
