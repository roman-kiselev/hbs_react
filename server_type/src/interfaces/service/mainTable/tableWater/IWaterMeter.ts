export interface IWaterMeter {
    id: number;
    section: number;
    floor: number;
    flat: number;
    office: number;
    line: number | null;
    typeMeter: string;
    numberMeter: number;
    sumMeter: number;
    numberKdl: number;
    numberAsr: number;
    comment: string;
    objectBuildId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}
