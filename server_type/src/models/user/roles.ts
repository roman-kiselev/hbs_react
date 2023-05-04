import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { IRoleCreate } from "../../interfaces";
import { User } from "./users";
import { UsersRole } from "./users_role";

@Table({ tableName: "roles" })
export class Role extends Model<Role, IRoleCreate> {
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
    name: string;

    @BelongsToMany(() => User, () => UsersRole)
    users: User[];
}
