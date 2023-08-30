import express from "express";
import { mainTableWaterRouter } from "./mainTable";
import { objectBuildsRouter, sectionsRouter } from "./objects";
import { roleRouter, userRouter } from "./users";
const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/role", roleRouter);
mainRouter.use("/object", objectBuildsRouter);
mainRouter.use("/section", sectionsRouter);

mainRouter.use("/testAddWater", mainTableWaterRouter);

export default mainRouter;
