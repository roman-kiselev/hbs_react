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

    async getListInvalidWaterMeter(req, res) {
        try {
            const { id: objectBuildId } = req.params;
            const { number } = req.query;
            if (!number || !objectBuildId) {
                return res.json({ message: "Не заданы параметры" });
            }
            const meters = await MetersService.getInvalidWaterMeters(
                number,
                objectBuildId
            );
            return res.json(meters);
        } catch (e) {
            console.log(e);
        }
    }

    async getListInvalidHeatMeter(req, res) {
        try {
            const { id: objectBuildId } = req.params;
            const { number } = req.query;
            if (!number || !objectBuildId) {
                return res.json({ message: "Не заданы параметры" });
            }
            const meters = await MetersService.getInvalidHeatMeters(
                number,
                objectBuildId
            );
            return res.json(meters);
        } catch (e) {
            console.log(e);
        }
    }

    async getListInvalidElectricalMeter(req, res) {
        try {
            const { id: objectBuildId } = req.params;
            const { number } = req.query;
            if (!number || !objectBuildId) {
                return res.json({ message: "Не заданы параметры" });
            }
            const meters = await MetersService.getInvalidElectricalMeters(
                number,
                objectBuildId
            );
            return res.json(meters);
        } catch (e) {
            console.log(e);
        }
    }

    async getRepeatingMeters(req, res) {
        try {
            const { id: objectBuildId } = req.params;
            const meters = await MetersService.getRepeatingNumberMeters(
                objectBuildId
            );

            return res.json(meters);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new MetersController();
