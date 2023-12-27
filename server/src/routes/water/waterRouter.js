import express from "express";
import WaterController from "../../controller/water/WaterController.js";

const waterRouter = express.Router();

waterRouter.get("/:id", WaterController.findAllMetersForOneObject);
waterRouter.post("/", WaterController.create);

export default waterRouter;
