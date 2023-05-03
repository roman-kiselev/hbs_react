import express from "express";
import TestWaterMeterController from "../../controller/test/testWaterMeterController.js";
const router = express.Router();

router.post("/", TestWaterMeterController.addNewMeter);

router.get("/", TestWaterMeterController.getAllByIdUserAndObject);
router.get(
    "/getAllMeters",
    TestWaterMeterController.getExcelAllWaterMeterInObject
);
router.get("/getAllMetersChange/:id", TestWaterMeterController.getChangeTable);
router.get(
    "/synchronization/:id",
    TestWaterMeterController.synchronizationTable
);

router.get("/getAllTable/:id", TestWaterMeterController.getAllMetersInObject);
router.post(
    "/addAllMetersExcel",
    TestWaterMeterController.addAllMetersInObject
);

router.get("/search", TestWaterMeterController.searchByNumber);
//router.get("/excel", TestWaterMeterController.getExcelTest);
router.get("/getTemplateWater", TestWaterMeterController.getWaterTemplate);
router.get("/getDat/:id", TestWaterMeterController.getDatText);
router.delete("/:id", TestWaterMeterController.deleteMeter);
router.post("/:id", TestWaterMeterController.getOneMeter);

export default router;
