import express from "express";
import MetersController from "../../controller/meters/MetersController.js";
const metersRouter = express.Router();

metersRouter.get("/", MetersController.getMeters);
metersRouter.get("/check", MetersController.checkMeters);

export default metersRouter;
