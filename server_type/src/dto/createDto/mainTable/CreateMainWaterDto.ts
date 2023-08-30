class CreateMainWaterDto {
    section: number;
    floor: number;
    flat: number;
    office: number;
    numberKdl: number;
    channelCool: number;
    channelHot: number;
    numberMeterCool: number;
    numberMeterHot: number;
    sumMeterCool: number;
    sumMeterHot: number;
    userId: number;
    objectBuildId: number;
    comment?: string;
}

export default CreateMainWaterDto;
