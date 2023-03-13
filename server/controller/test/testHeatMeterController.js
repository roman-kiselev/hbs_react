// Контроллер для списка счётчиков тепла
import Models from "../../models/models.js";

class TestHeatMeterController {
    // Создадим счётчик тепла
    async addNewMeter(req, res) {
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

            const heatMeter = await Models.MainAddMeter.create({
                section: section,
                floor: floor,
                flat: flat,
                typeMeter: "Счётчик тепла",
                line: line,
                numberMeter: numberMeter,
                sumMeter: sumMeter,
                objectBuildId,
                userId,
            });

            return res.json({ heatMeter });
        } catch (e) {
            console.log(e);
        }
    }

    async getAllHeatMeters(req, res) {
        try {
            let { userId, objectId, limit, page } = req.query;

            page = Number(page) || 1;
            limit = Number(limit) || 6;
            let offset = page * limit - limit;

            let typeMeter = "Счётчик тепла";

            const heatMeters = await Models.MainAddMeter.findAndCountAll({
                where: {
                    objectBuildId: objectId,
                    userId: userId,
                    typeMeter: typeMeter,
                },
                limit,
                offset,
                order: [["createdAt", "DESC"]],
            });

            return res.json({ heatMeters });
        } catch (e) {
            console.log(e);
        }
    }

    async editHeatMeterById(req, res) {
        try {
            const { id } = req.params;

            const { floor, flat, section, line, numberMeter, sumMeter } =
                req.body;

            console.log(floor, flat, section, line, numberMeter, sumMeter);
            const heatMeter = await Models.MainAddMeter.findByPk(id);

            await heatMeter.update({
                floor,
                flat,
                section,
                line,
                numberMeter,
                sumMeter,
            });

            return res.json({ heatMeter });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new TestHeatMeterController();
