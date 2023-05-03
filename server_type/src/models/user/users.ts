// Создаём модель пользователя

import { DataTypes } from "sequelize";
import { Table, Model, Column } from "sequelize-typescript";

interface UserAttr {
    login: string;
    password: string;
}

@Table
export class User extends Model<User, UserAttr> {
    @Column({
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    })
    id: number;
    @Column({
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    })
    login: string;
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    password: string;
}
