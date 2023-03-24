import Models from "../../models/models.js";
import pkg from "sequelize";
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

        const listFlats = await Models.MainAddMeter.findAndCountAll({
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
            limit: limit,
            offset: offset,
        });

        return listFlats;
    } catch (e) {
        console.log(e);
    }
};
