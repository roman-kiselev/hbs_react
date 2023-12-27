import express from "express";
import TestWaterMeterController from "../../controller/test/testWaterMeterController.js";
const router = express.Router();

/**
 * @description Получаем все аср по id пользователя и id объекта
 * @param {тип} название - Описание параметра
 * @returns {тип} - Описание возвращаемого значения
 */
router.get("/", TestWaterMeterController.getAllByIdUserAndObject);
router.get(
    "/getAllMeters",
    TestWaterMeterController.getExcelAllWaterMeterInObject
);
router.get(
    "/getAllMetersPulsar",
    TestWaterMeterController.getExcelAllWaterMeterPulsarInObject
);
router.get("/search", TestWaterMeterController.searchByNumber);
router.get("/getTemplateWater", TestWaterMeterController.getWaterTemplate);

router.post("/", TestWaterMeterController.addNewMeter);

router.post(
    "/addAllMetersExcel",
    TestWaterMeterController.addAllMetersInObject
);

router.post("/:id", TestWaterMeterController.getOneMeter);
router.get(
    "/getTableForOffline/:id",
    TestWaterMeterController.getTableForOffline
);
router.get("/getAllTable/:id", TestWaterMeterController.getAllMetersInObject);
router.get("/getAllMetersChange/:id", TestWaterMeterController.getChangeTable);
router.get(
    "/synchronization/:id",
    TestWaterMeterController.synchronizationTable
);
router.get("/getDat/:id", TestWaterMeterController.getDatText);
router.put("/updateBulk", TestWaterMeterController.updateDataBase);
router.delete("/:id", TestWaterMeterController.deleteMeter);

//router.get("/excel", TestWaterMeterController.getExcelTest);

export default router;
