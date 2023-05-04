import express from "express";
import { roleRouter } from "./users";
const mainRouter = express.Router();

mainRouter.use("/role", roleRouter);

export default mainRouter;
