import Models from "../../models/models.js";
import { Sequelize } from "sequelize";
import pkg from "sequelize";
const { Op } = pkg;

class KdlMainTableController {
    // Получаем все записи из базы данных без повторов
    async getAllUnique(req, res) {
        try {
            const { objectBuildId } = req.query;
            const allKdl = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                    numberKdl: {
                        [Op.not]: 0,
                    },
                },
                attributes: [
                    [
                        Sequelize.fn("DISTINCT", Sequelize.col("numberKdl")),
                        "numberKdl",
                    ],
                ],
                order: [["numberKdl", "ASC"]],
            });

            return res.json({ allKdl });
        } catch (e) {
            console.log(e);
        }
    }

    async getAllBusyChannels(req, res) {
        try {
        } catch (e) {
            console.log(e);
        }
    }
}

export default new KdlMainTableController();
