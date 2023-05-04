import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "./roles";
import { User } from "./users";

@Table({ tableName: "users_roles" })
export class UsersRole extends Model<UsersRole> {
    @Column({
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataTypes.INTEGER,
    })
    userId: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataTypes.INTEGER,
    })
    roleId: number;
}
