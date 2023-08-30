import express from "express";
import {
    mainElectricalRouter,
    mainHeatRouter,
    mainSectionRouter,
    mainTableWaterRouter,
} from "./mainTable";
import { objectBuildsRouter, sectionsRouter } from "./objects";
import { roleRouter, userRouter } from "./users";
const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/role", roleRouter);
mainRouter.use("/object", objectBuildsRouter);
mainRouter.use("/section", sectionsRouter);

mainRouter.use("/testAddWater", mainTableWaterRouter);
mainRouter.use("/testAddHeat", mainHeatRouter);
mainRouter.use("/testElectrical", mainElectricalRouter);

mainRouter.use("/mainTable", mainSectionRouter);

export default mainRouter;
