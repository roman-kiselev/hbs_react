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
router.get("/line", testElectricalMeterController.getAllLines);
router.get(
    "/getTemplateElectrical",
    testElectricalMeterController.getTemplateElectrical
);
router.get("/search", testElectricalMeterController.searchByNumber);
router.delete("/:id", testElectricalMeterController.deleteMeter);
router.post("/:id", testElectricalMeterController.editMeterById);

export default router;
