import express from "express";
import StatusRadioController from "../../controller/statusRadio/StatusRadioController.js";
const statusRadioRouter = express.Router();

statusRadioRouter.get("/currentStatus", StatusRadioController.getCurrentStatus);
statusRadioRouter.get("/lastArr", StatusRadioController.getLastArrForOneMeter);
statusRadioRouter.post("/", StatusRadioController.create);

export default statusRadioRouter;
