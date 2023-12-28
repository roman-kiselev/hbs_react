import express from "express";
import MetersController from "../../controller/meters/MetersController.js";
const metersRouter = express.Router();

metersRouter.get("/", MetersController.getMeters);

export default metersRouter;
