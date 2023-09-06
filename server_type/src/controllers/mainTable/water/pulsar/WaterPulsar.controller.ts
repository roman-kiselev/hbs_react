import { Request, Response } from "express";
import { PulsarWaterService } from "../../../../services";

interface ITEst {
    objectBuildId: number;
}

class WaterPulsarController {
    async getListDevicesWithChannels(req: Request, res: Response) {
        try {
            const { objectBuildId } = req.query as unknown as ITEst;
            const devices = await PulsarWaterService.getAllDeviceInObject(
                objectBuildId
            );

            return res.status(200).json({ devices });
        } catch (e) {
            console.error(e);
        }
    }

    async getChannelsByNumberDevice(req: Request, res: Response) {
        try {
            const { numberKdl } = req.query as unknown as { numberKdl: number };
            const listChannels =
                await PulsarWaterService.getAllChannelByNumberDevice(numberKdl);
            return res.status(200).json({ listChannels });
        } catch (e) {
            console.error(e);
        }
    }
}

export default new WaterPulsarController();
