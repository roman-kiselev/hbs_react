import express from "express";
import { MainTableWaterController } from "../../controllers";
const mainTableWaterRouter = express.Router();

mainTableWaterRouter.get("/", MainTableWaterController.getAllMetersInOneObject);
mainTableWaterRouter.post("/", MainTableWaterController.addNewMeter);

export default mainTableWaterRouter;
