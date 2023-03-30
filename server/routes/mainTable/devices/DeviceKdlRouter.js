import express from "express";
const router = express.Router();
import DeviceKdlController from "../../../controller/mainTable/devices/DeviceKdlController.js";

router.get("/kdl", DeviceKdlController.getAllKdl);

export default router;
