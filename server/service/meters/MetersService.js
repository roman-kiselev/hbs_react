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
}

export default new MeterService();
