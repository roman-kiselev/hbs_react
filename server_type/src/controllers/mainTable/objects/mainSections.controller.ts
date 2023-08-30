import { Op, Sequelize } from "sequelize";
import { MainAddMeter } from "../../../models";

class MainSectionsController {
    async getAllSections(req, res) {
        const { id } = req.query;

        const sections = await MainAddMeter.findAll({
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

export default new MainSectionsController();
