import express from "express";
import DeviceKdlController from "../../../controller/mainTable/devices/DeviceKdlController.js";
const DeviceKdlRouter = express.Router();

DeviceKdlRouter.get("/kdl", DeviceKdlController.getAllKdl);

export default DeviceKdlRouter;
