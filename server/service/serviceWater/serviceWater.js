import Models from "../../models/models.js";
import pkg from "sequelize";
const { Op } = pkg;
// Поиск по номеру
export const getMetersByNumberFlat = async (number) => {
    try {
        const coolWater = "Счётчик холодной воды";
        const hotWater = "Счётчик горячей воды";

        const listFlats = await Models.MainAddMeter.findAll({
            where: {
                flat: {
                    [Op.like]: `%${number}%`,
                },
                typeMeter: {
                    [Op.or]: [coolWater, hotWater],
                },
            },
        });

        return listFlats;
    } catch (e) {
        console.log(e);
    }
};
