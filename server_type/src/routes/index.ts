import express from "express";
import { roleRouter } from "./users";
const mainRouter = express.Router();

mainRouter.use(roleRouter);

export default mainRouter;
