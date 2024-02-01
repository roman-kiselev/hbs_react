import express from "express";
import WaterController from "../../controller/water/WaterController.js";

const waterRouter = express.Router();

waterRouter.get("/:id", WaterController.findAllMetersForOneObject);
waterRouter.get("/getLineMeters/:id", WaterController.getArrWithLineMeters);
waterRouter.get("/getFloors/:id", WaterController.getFloorsForOneObject);
waterRouter.get(
    "/getLineMeterOneFloor/:id",
    WaterController.getLinesForOneFloor
);
waterRouter.post("/", WaterController.create);

export default waterRouter;
