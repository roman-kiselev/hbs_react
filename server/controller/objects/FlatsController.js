import Models from "../../models/models.js";

class FlatsController {
    async createFlats(req, res) {
        try {
            const { id: idObject } = req.query;
            const { number } = req.body;
            /*const object = await Models.ObjectBuilds.findOne({where: {id}})*/
            const flat = await Models.Flats.create({
                number,
                objectBuildId: idObject,
            });

            return res.json({ flat });
        } catch (e) {
            console.log(e);
        }
    }

    async getAllFlats(req, res) {
        try {
            const flats = await Models.Flats.findAll({
                include: { all: true },
            });
            return res.json({ flats });
        } catch (e) {
            console.log(e);
        }
    }

    async getOneFlats(req, res) {
        try {
            const { id } = req.params;
            const flat = await Models.Flats.findOne({
                where: { id },
                include: { all: true },
            });
            return res.json({ flat });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new FlatsController();
