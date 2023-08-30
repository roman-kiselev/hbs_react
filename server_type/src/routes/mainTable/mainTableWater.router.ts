import express from "express";
import { MainTableWaterController } from "../../controllers";
const mainTableWaterRouter = express.Router();

mainTableWaterRouter.get("/", MainTableWaterController.getAllMetersInOneObject);
mainTableWaterRouter.get(
    "/getAllMeters",
    MainTableWaterController.getExcelAllWaterMeterInObject
);
mainTableWaterRouter.get(
    "/getAllMetersPulsar",
    MainTableWaterController.getExcelAllWaterMeterPulsarInObject
);
mainTableWaterRouter.get("/search", MainTableWaterController.searchByNumber);
mainTableWaterRouter.get(
    "/getTemplateWater",
    MainTableWaterController.getWaterTemplate
);

mainTableWaterRouter.post("/", MainTableWaterController.addNewMeter);

mainTableWaterRouter.post(
    "/addAllMetersExcel",
    MainTableWaterController.addAllMetersInObject
);

mainTableWaterRouter.post("/:id", MainTableWaterController.getOneMeter);
mainTableWaterRouter.get(
    "/getTableForOffline/:id",
    MainTableWaterController.getTableForOffline
);
mainTableWaterRouter.get(
    "/getAllTable/:id",
    MainTableWaterController.getAllMetersInObject
);
// mainTableWaterRouter.get(
//     "/getAllMetersChange/:id",
//     MainTableWaterController.getChangeTable
// );
// mainTableWaterRouter.get(
//     "/synchronization/:id",
//     MainTableWaterController.synchronizationTable
// );
mainTableWaterRouter.get("/getDat/:id", MainTableWaterController.getDatText);
mainTableWaterRouter.put(
    "/updateBulk",
    MainTableWaterController.updateDataBase
);
mainTableWaterRouter.delete("/:id", MainTableWaterController.deleteMeter);

export default mainTableWaterRouter;
