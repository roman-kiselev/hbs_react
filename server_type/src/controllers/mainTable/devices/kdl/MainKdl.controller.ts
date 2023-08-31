import { Op, Sequelize } from "sequelize";
import { MainAddMeter } from "../../../../models";

class MainKdlController {
    async getAllKdl(req, res) {
        try {
            const { id, section } = req.query;

            const listKdl = await MainAddMeter.findAll({
                where: {
                    objectBuildId: id,
                    section,
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

            return res.json({ listKdl });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new MainKdlController();
