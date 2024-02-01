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

    async getFloorsForOneObject(req, res) {
        try {
            const { id: objectBuildId } = req.params;

            const floors = await WaterService._getUniqFloors(objectBuildId);

            res.json(floors);
        } catch (e) {
            console.log(e);
        }
    }

    async getArrWithLineMeters(req, res) {
        try {
            const { id } = req.params;
            const objectBuildId = Number(id);
            if (typeof objectBuildId === "number") {
                const data = await WaterService.getMetersByLineAndFloor(
                    objectBuildId
                );
                res.json(data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getLinesForOneFloor(req, res) {
        try {
            const { id: objectBuildId } = req.params;
            const { floor } = req.query;

            const data = await WaterService.getLinesForOneFloor(
                objectBuildId,
                floor
            );
            return res.json(data);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new WaterController();
