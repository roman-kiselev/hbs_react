import { CreateMainWaterDto } from "../../dto";

class WaterMeter {
    constructor(
        private section: number,
        private floors: number,
        private flat: number
    ) {}
}

const waterMeter = (dto: CreateMainWaterDto) => {
    const {
        channelCool,
        channelHot,
        flat,
        floors,
        numberKdl,
        numberMeterCool,
        numberMeterHot,
        objectBuildId,
        office,
        section,
        sumMeterCool,
        sumMeterHot,
        userId,
    } = dto;
    return {
        getCoolMeter() {
            return {
                section,
                floors,
                flat: flat ? flat : 0,
                office: office ? office : 0,
                typeMeter: "Счётчик холодной воды",
                numberKdl,
                numberAsr: channelCool,
                numberMeter: numberMeterCool,
                sumMeter: sumMeterCool,
                objectBuildId,
                userId,
            };
        },

        getHotMeter() {
            return {
                section,
                floors,
                flat: flat ? flat : 0,
                office: office ? office : 0,
                typeMeter: "Счётчик горячей воды",
                numberKdl,
                numberAsr: channelHot,
                numberMeter: numberMeterHot,
                sumMeter: sumMeterHot,
                objectBuildId,
                userId,
            };
        },
    };
};

export default waterMeter;
