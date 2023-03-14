import Models from "../../models/models.js";

class TestElectricalMeterController {
    async createMeter(req, res) {
        try {
            const {
                section,
                floor,
                flat,
                line,
                numberMeter,
                sumMeter,
                objectBuildId,
                userId,
            } = req.body;

            const newMeter = await Models.MainAddMeter.create({
                section,
                floor,
                flat,
                line,
                typeMeter: "Счётчик электроэнергии",
                numberMeter,
                sumMeter,
                objectBuildId,
                userId,
            });

            return res.json({ newMeter });
        } catch (e) {
            console.log(e);
        }
    }

    async getAllMeters(req, res) {
        try {
            let { userId, objectBuildId, limit, page } = req.query;

            page = Number(page) || 1;
            limit = Number(limit) || 6;
            let offset = page * limit - limit;

            let typeMeter = "Счётчик электроэнегрии";

            const meters = await Models.MainAddMeter.findAndCountAll({
                where: {
                    objectBuildId,
                    userId,
                    typeMeter,
                },
                limit,
                offset,
                order: [["createdAt", "DESC"]],
            });

            return res.json({ meters });
        } catch (e) {
            console.log(e);
        }
    }

    async editMeterById(req, res) {
        try {
            const { id } = req.params;
            const { floor, flat, line, section, numberMeter, sumMeter } =
                req.body;

            const meter = await Models.MainAddMeter.findByPk(id);

            await meter.update({
                floor,
                flat,
                line,
                section,
                numberMeter,
                sumMeter,
            });

            return res.json({ meter });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new TestElectricalMeterController();
