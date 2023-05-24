import express from "express";
import { roleRouter, userRouter } from "./users";
import { objectBuildsRouter } from "./objects";
const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/role", roleRouter);
mainRouter.use("/object", objectBuildsRouter);

export default mainRouter;
