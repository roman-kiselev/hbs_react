import express from "express";
import { MainKdlController } from "../../../../controllers";
const mainKdlRouter = express.Router();

mainKdlRouter.get("/kdl", MainKdlController.getAllKdl);

export default mainKdlRouter;
