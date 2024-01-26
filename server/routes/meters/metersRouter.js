import express from "express";
import MetersController from "../../controller/meters/MetersController.js";
const metersRouter = express.Router();

metersRouter.get(
    "/invalidWater/:id",
    MetersController.getListInvalidWaterMeter
);
metersRouter.get("/invalidHeat/:id", MetersController.getListInvalidHeatMeter);
metersRouter.get(
    "/invalidElectrical/:id",
    MetersController.getListInvalidElectricalMeter
);
metersRouter.get("/repeatingMeter/:id", MetersController.getRepeatingMeters);

metersRouter.get("/", MetersController.getMeters);
metersRouter.get("/check", MetersController.checkMeters);

export default metersRouter;
