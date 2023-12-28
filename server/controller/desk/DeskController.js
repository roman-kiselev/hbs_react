import DeskService from "../../service/desk/DeskService.js";

class DeskController {
    async create(req, res) {
        const { mainMeterId, objectBuildId } = req.body;
        console.log(mainMeterId, objectBuildId);
        const desk = await DeskService.create(mainMeterId, objectBuildId);
        return res.json(desk);
    }

    async delete(req, res) {
        const { id } = req.params;
        const desk = await DeskService.delete(id);
        return res.json(desk);
    }

    async changeStatus(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        const desk = await DeskService.changeStatus(id, status);
        return res.json(desk);
    }

    async getAll(req, res) {
        const { objectBuildId } = req.query;
        const desk = await DeskService.getAll(objectBuildId);
        return res.json(desk);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const desk = await DeskService.getOne(id);
        return res.json({ desk });
    }

    async getAllWhereCheck(req, res) {
        const desk = await DeskService.getAllWhereCheck();
        return res.json({ desk });
    }
}

export default new DeskController();
