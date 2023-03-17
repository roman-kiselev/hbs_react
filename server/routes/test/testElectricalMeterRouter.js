import express from "express";
const router = express.Router();
import testElectricalMeterController from "../../controller/test/testElectricalMeterController.js";

router.get("/", testElectricalMeterController.getAllMeters);
router.post("/", testElectricalMeterController.createMeter);
router.get(
    "/getAllMeters",
    testElectricalMeterController.getExcelAllElectricalMeterInObject
);
router.post(
    "/addAllMetersExcel",
    testElectricalMeterController.addAllMetersInObject
);

router.post("/:id", testElectricalMeterController.editMeterById);

export default router;
