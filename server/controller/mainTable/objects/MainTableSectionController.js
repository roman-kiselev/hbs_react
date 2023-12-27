import pkg, { Sequelize } from "sequelize";
import Models from "../../../models/models.js";
const { Op } = pkg;

class MainTableSectionController {
    async getAllSections(req, res) {
        const { id } = req.query;
        //
        const sections = await Models.MainAddMeter.findAll({
            where: {
                objectBuildId: id,
                section: {
                    [Op.not]: 0,
                },
            },
            attributes: [
                [Sequelize.fn("DISTINCT", Sequelize.col("section")), "section"],
            ],
            order: [["section", "ASC"]],
        });

        res.json({ sections });
    }
}

export default new MainTableSectionController();
