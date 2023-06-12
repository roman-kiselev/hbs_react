import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { Sections } from "./sections";

interface FloorsAttributes {
    id: number;
    value: number;
    sectionId: number;
}

@Table({ tableName: "floors" })
export class Floors extends Model<Floors, FloorsAttributes> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    value: number;

    @ForeignKey(() => Sections)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    sectionId: number;
}
