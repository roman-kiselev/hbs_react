import pkg, { Sequelize } from "sequelize";
import sequelize from "../../db.js";
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

    // Получить номера счётчиков которые не подходят по номеру(не валидные)
    async getInvalidWaterMeters(number, objectBuildId) {
        try {
            const listInvalidMeters =
                await sequelize.query(`SELECT * FROM hbs_react.main_meters
            WHERE objectBuildId=${objectBuildId} and typeMeter!="Счётчик тепла" and typeMeter != "Счётчик электроэнергии" and length(numberMeter) <> ${number};`);
            return listInvalidMeters[0];
        } catch (e) {
            console.log(e);
        }
    }

    async getInvalidHeatMeters(number, objectBuildId) {
        try {
            const listInvalidMeters = await sequelize.query(`
                SELECT * FROM hbs_react.main_meters
                WHERE objectBuildId=${objectBuildId} and typeMeter="Счётчик тепла" and length(numberMeter) <> ${number};`);
            return listInvalidMeters[0];
        } catch (e) {
            console.log(e);
        }
    }

    async getInvalidElectricalMeters(number, objectBuildId) {
        try {
            const listInvalidMeters = await sequelize.query(`
            SELECT * FROM hbs_react.main_meters
            WHERE objectBuildId=${objectBuildId} and typeMeter="Счётчик электроэнергии" and length(numberMeter) <> ${number};`);

            return listInvalidMeters[0];
        } catch (e) {
            console.log(e);
        }
    }

    async getRepeatingNumberMeters(objectBuildId) {
        try {
            const listMeters = await sequelize.query(`
            SELECT 
            *
        FROM
            hbs_react.main_meters
        WHERE
            numberMeter IN (SELECT 
                    numberMeter
                FROM
                    hbs_react.main_meters
                WHERE
                    objectBuildId = ${objectBuildId}
                GROUP BY numberMeter
                HAVING COUNT(numberMeter) > 1)
        ORDER BY numberMeter DESC;
            `);

            return listMeters[0];
        } catch (e) {
            console.log(e);
        }
    }
}

export default new MeterService();
