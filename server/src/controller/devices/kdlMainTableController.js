import pkg, { Sequelize } from "sequelize";
import Models from "../../models/models.js";
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

    async getChannel(req, res) {
        try {
            const { objectBuildId, numberKdl } = req.query;

            const allChannel = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                    numberKdl,
                },
                order: [["numberAsr", "ASC"]],
            });

            return res.json({ allChannel });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new KdlMainTableController();
