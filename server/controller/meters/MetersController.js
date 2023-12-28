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
}

export default new MetersController();
