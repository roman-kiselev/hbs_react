import MetersService from "../../service/meters/MetersService.js";

class MetersController {
    async getMeters(req, res) {
        const { number, objectBuildId } = req.query;
        const list = await MetersService.getMetersByNumberFlat(
            number,
            objectBuildId
        );
        return res.json(list);
    }

    async checkMeters(req, res) {
        const { number, objectBuildId, typeMeter } = req.query;
        const meter = await MetersService.checkMeter(
            number,
            objectBuildId,
            typeMeter
        );
        return res.json(meter);
    }
}

export default new MetersController();
