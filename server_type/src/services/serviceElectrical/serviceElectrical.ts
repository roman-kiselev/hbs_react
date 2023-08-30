import pkg, { Sequelize } from "sequelize";
import { MainAddMeter } from "../../models";
const { Op } = pkg;

// Поиск по номеру
export const getElectricalMetersByNumberFlat = async (
    number,
    objectId,
    limit,
    page
) => {
    try {
        // Получаем данные для постраничной навигации

        page = Number(page) || 1;
        limit = Number(limit) || 6;
        let offset = page * limit - limit;

        const typeMeter = "Счётчик электроэнергии";

        const listFlats = await MainAddMeter.findAndCountAll({
            where: {
                objectBuildId: objectId,
                typeMeter: typeMeter,
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
                            [Op.like]: { val: `%${number}%` },
                        },
                    },
                    {
                        numberMeter: {
                            [Op.like]: { val: `%${number}%` },
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
            limit: limit,
            offset: offset,
        });

        return listFlats;
    } catch (e) {
        console.log(e);
    }
};
