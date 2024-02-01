import StatusRadioService from "../../service/statusRadio/StatusRadioService.js";

class StatusRadioController {
    async create(req, res) {
        try {
            console.log(req.body);
            const { mainMeterId, status, comment, signal, objectBuildId } =
                req.body;
            const data = StatusRadioService.create(
                mainMeterId,
                status,
                comment,
                signal,
                objectBuildId
            );

            return res.json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getCurrentStatus(req, res) {
        try {
            const { mainMeterId } = req.query;

            const data = await StatusRadioService.getCurrentStatus(mainMeterId);

            return res.json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getLastArrForOneMeter(req, res) {
        try {
            const { mainMeterId } = req.query;

            const data = await StatusRadioService.getLastStatusForOneMeter(
                mainMeterId
            );

            return res.json(data);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new StatusRadioController();
