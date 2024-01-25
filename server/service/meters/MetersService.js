import pkg, { Sequelize } from "sequelize";
import Models from "../../models/models.js";
const { Op } = pkg;

class MeterService {
    // 1. Получение счётчика по номеру (части номера)
    // return 5 счётчиков
    async getMetersByNumberFlat(number, objectBuildId) {
        try {
            const list = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                    [Op.or]: [
                        {
                            flat: {
                                [Op.eq]: number,
                            },
                        },
                        {
                            numberMeter: {
                                [Op.eq]: number,
                            },
                        },
                        {
                            flat: {
                                [Op.like]: `%${number}%`,
                            },
                        },
                        {
                            numberMeter: {
                                [Op.like]: `%${number}%`,
                            },
                        },
                    ],
                },
                order: [
                    Sequelize.literal(
                        `
                        CASE 
                             WHEN flat = '${number}' THEN 1
                             WHEN numberMeter = '${number}' THEN 2
                             ELSE 3
                           END
                           `
                    ),
                ],
                limit: 5,
            });

            return list;
        } catch (e) {
            console.log(e);
        }
    }

    async __getWaterMeterByNumber(number, objectBuildId) {
        try {
            const meter = await Models.MainAddMeter.findOne({
                where: {
                    objectBuildId,
                    numberMeter: number,
                    [Op.or]: [
                        { typeMeter: "Счётчик холодной воды" },
                        { typeMeter: "Счётчик горячей воды" },
                    ],
                },
            });

            return meter;
        } catch (e) {
            console.log(e);
        }
    }

    async __getHeatMeterByNumber(number, objectBuildId) {
        try {
            const meter = await Models.MainAddMeter.findOne({
                where: {
                    objectBuildId,
                    numberMeter: number,
                    typeMeter: "Счётчик тепла",
                },
            });

            return meter;
        } catch (e) {
            console.log(e);
        }
    }

    async __getElectricalMeterByNumber(number, objectBuildId) {
        try {
            const meter = await Models.MainAddMeter.findOne({
                where: {
                    objectBuildId,
                    numberMeter: number,
                    // [Op.or]: [
                    //     {
                    //         numberMeter: {
                    //             [Op.like]: `%${number}`,
                    //         },
                    //     },
                    //     {
                    //         numberMeter: number,
                    //     },
                    // ],

                    typeMeter: "Счётчик электроэнергии",
                },
            });

            return meter;
        } catch (e) {
            console.log(e);
        }
    }

    // Проверка счётчиков
    async checkMeter(number, objectBuildId, typeMeter) {
        try {
            console.log(number, objectBuildId, typeMeter);
            if (typeMeter === "water") {
                const meter = this.__getWaterMeterByNumber(
                    number,
                    objectBuildId
                );
                return meter;
            } else if (typeMeter === "heat") {
                const meter = this.__getHeatMeterByNumber(
                    number,
                    objectBuildId
                );
                return meter;
            } else if (typeMeter === "electrical") {
                const meter = this.__getElectricalMeterByNumber(
                    number,
                    objectBuildId
                );
                return meter;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default new MeterService();
