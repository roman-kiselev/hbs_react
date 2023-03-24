import Models from "../../models/models.js";
import pkg from "sequelize";
const { Op } = pkg;

// Поиск по номеру
export const getMetersByNumberFlat = async (number, objectId, limit, page) => {
    try {
        // Получаем данные для постраничной навигации

        page = Number(page) || 1;
        limit = Number(limit) || 6;
        let offset = page * limit - limit;

        const heatWater = "Счётчик тепла";

        const listFlats = await Models.MainAddMeter.findAndCountAll({
            where: {
                objectBuildId: objectId,
                flat: {
                    [Op.like]: `%${number}%`,
                },
                typeMeter: heatWater,
            },
            limit: limit,
            offset: offset,
        });

        return listFlats;
    } catch (e) {
        console.log(e);
    }
};
