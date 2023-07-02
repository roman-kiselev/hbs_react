import express from "express";
import { roleRouter, userRouter } from "./users";
import { objectBuildsRouter, sectionsRouter } from "./objects";
const mainRouter = express.Router();

mainRouter.use("/auth", userRouter);
mainRouter.use("/role", roleRouter);
mainRouter.use("/object", objectBuildsRouter);
mainRouter.use("/section", sectionsRouter);

export default mainRouter;
