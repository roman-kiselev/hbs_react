import express from "express";
import { MainTableElectricalController } from "../../controllers";
const mainElectricalRouter = express.Router();

mainElectricalRouter.get("/", MainTableElectricalController.getAllMeters);
mainElectricalRouter.post("/", MainTableElectricalController.createMeter);
mainElectricalRouter.get(
    "/getAllMeters",
    MainTableElectricalController.getExcelAllElectricalMeterInObject
);
mainElectricalRouter.post(
    "/addAllMetersExcel",
    MainTableElectricalController.addAllMetersInObject
);
mainElectricalRouter.get("/line", MainTableElectricalController.getAllLines);
mainElectricalRouter.get(
    "/getTemplateElectrical",
    MainTableElectricalController.getTemplateElectrical
);
mainElectricalRouter.get(
    "/search",
    MainTableElectricalController.searchByNumber
);
mainElectricalRouter.delete("/:id", MainTableElectricalController.deleteMeter);
mainElectricalRouter.post("/:id", MainTableElectricalController.editMeterById);

export default mainElectricalRouter;
