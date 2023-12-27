import WaterService from "../../service/water/WaterService.js";

class WaterController {
    /**
     * @description Создание счетчиков воды
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @returns {Promise<{water}>}
     */
    async create(req, res) {
        try {
            const { body } = req;
            const water = await WaterService.createAsrTwo(body);
            return res.json(water);
        } catch (e) {
            console.log(e);
        }
    }

    async findAllMetersForOneObject(req, res) {
        try {
            const { id: objectBuildId } = req.params;

            const meters = await WaterService.findAllMetersForOneObject(
                objectBuildId
            );
            // console.log(meters);
            return res.json(meters);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new WaterController();
