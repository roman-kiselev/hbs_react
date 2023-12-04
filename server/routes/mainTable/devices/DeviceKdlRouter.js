import express from "express";
import DeviceKdlController from "../../../controller/mainTable/devices/DeviceKdlController.js";
const deviceKdlRouter = express.Router();

deviceKdlRouter.get("/kdl", DeviceKdlController.getAllKdl);

export default deviceKdlRouter;
