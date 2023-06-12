import {
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from "sequelize-typescript";
import { Floors } from "./floors";
import { ObjectsBuilds } from "./objectsBuilds";

interface SectionAttributes {
    value: number;
    objectId: number;
}

@Table({ tableName: "sections" })
export class Sections extends Model<Sections, SectionAttributes> {
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

    @ForeignKey(() => ObjectsBuilds)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    objectId: number;

    @HasMany(() => Floors)
    floors: Floors[];
}
