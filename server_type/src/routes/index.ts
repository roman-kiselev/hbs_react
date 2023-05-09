import express from "express";
import { roleRouter, userRouter } from "./users";
const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/role", roleRouter);

export default mainRouter;
