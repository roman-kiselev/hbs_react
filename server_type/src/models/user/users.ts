// Создаём модель пользователя

import { DataTypes } from "sequelize";
import { Table, Model, Column, BelongsToMany } from "sequelize-typescript";
import { IUserCreate } from "../../interfaces";
import { Role } from "./roles";
import { UsersRole } from "./users_role";

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreate> {
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

    @BelongsToMany(() => Role, () => UsersRole)
    roles: Role[];
}
