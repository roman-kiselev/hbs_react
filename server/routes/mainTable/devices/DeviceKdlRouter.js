import express from "express";
import DeviceKdlController from "../../../controller/mainTable/devices/DeviceKdlController.js";
const router = express.Router();

router.get("/kdl", DeviceKdlController.getAllKdl);

export default router;
