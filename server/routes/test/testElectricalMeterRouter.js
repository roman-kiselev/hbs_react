import express from "express";
const router = express.Router();
import testElectricalMeterController from "../../controller/test/testElectricalMeterController.js";

router.get("/", testElectricalMeterController.getAllMeters);
router.post("/", testElectricalMeterController.createMeter);
router.post("/:id", testElectricalMeterController.editMeterById);

export default router;
