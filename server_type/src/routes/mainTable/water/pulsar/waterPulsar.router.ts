import express from "express";
import { WaterPulsarController } from "../../../../controllers";
const waterPulsarRouter = express.Router();

waterPulsarRouter.get("/", WaterPulsarController.getListDevicesWithChannels);
waterPulsarRouter.get(
    "/getByNumber",
    WaterPulsarController.getChannelsByNumberDevice
);

export default waterPulsarRouter;
