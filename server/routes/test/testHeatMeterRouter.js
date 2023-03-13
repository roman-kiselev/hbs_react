import express from "express";
const router = express.Router();
import testHeatMeterController from "../../controller/test/testHeatMeterController.js";

router.post("/", testHeatMeterController.addNewMeter);

router.get("/", testHeatMeterController.getAllHeatMeters);

router.post("/:id", testHeatMeterController.editHeatMeterById);

export default router;
