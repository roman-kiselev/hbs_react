import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Sections } from "./sections";

interface ObjectsBuildsAttr {
    id: number;
    name: string;
    description: string;
    img: string;
}

@Table({ tableName: "object_builds" })
export class ObjectsBuilds extends Model<ObjectsBuilds, ObjectsBuildsAttr> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    img: string;

    @HasMany(() => Sections)
    sections: Sections[];
}
