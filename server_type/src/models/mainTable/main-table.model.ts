import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { ObjectsBuilds } from "../objects";
import { User } from "../user";

interface MainAddMeterAttributes {
    id: number;
    section: number;
    floor: number;
    flat: number;
    office: number;
    line: number;
    typeMeter: string;
    numberMeter: number;
    sumMeter: number;
    numberKdl: number;
    numberAsr: number;
    comment: string;
}

@Table({ tableName: "main_meter" })
export class MainAddMeter extends Model<MainAddMeter, MainAddMeterAttributes> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    section: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    floor: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    flat: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    office: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    line: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    typeMeter: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    numberMeter: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    sumMeter: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    numberKdl: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    numberAsr: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    comment: string;

    @ForeignKey(() => ObjectsBuilds)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    sectionId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;
}
