import express from "express";
import { MainTableHeatController } from "../../controllers";

const mainHeatRouter = express.Router();

mainHeatRouter.post("/", MainTableHeatController.addNewMeter);
mainHeatRouter.get("/", MainTableHeatController.getAllHeatMeters);
mainHeatRouter.get(
    "/getAllMeters",
    MainTableHeatController.getExcelAllHeatMeterInObject
);
mainHeatRouter.get(
    "/getForOffline/:id",
    MainTableHeatController.getAllHeatMetersForOffline
);
mainHeatRouter.post(
    "/addAllMetersExcel",
    MainTableHeatController.addAllMetersInObject
);
mainHeatRouter.post(
    "/sendForOffline/:id",
    MainTableHeatController.addOrUpdateMeter
);
mainHeatRouter.get("/line", MainTableHeatController.getAllLines);
mainHeatRouter.get("/getHeatTemplate", MainTableHeatController.getTemplateHeat);
mainHeatRouter.get("/search", MainTableHeatController.searchByNumber);
mainHeatRouter.delete("/:id", MainTableHeatController.deleteMeter);
mainHeatRouter.post("/:id", MainTableHeatController.editHeatMeterById);

export default mainHeatRouter;
