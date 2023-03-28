import Models from "../../../models/models.js";
import pkg, { Sequelize } from "sequelize";
import * as XLSX from "xlsx";
const { Op } = pkg;
import sequelize from "../../../db.js";

class MainTableSectionController {
    async getAllSections(req, res) {
        const sections = await Models.MainAddMeter.findAll({
            attributes: [
                [Sequelize.fn("DISTINCT", Sequelize.col("section")), "section"],
            ],
        });
        res.json({ sections });
    }
}

export default new MainTableSectionController();
