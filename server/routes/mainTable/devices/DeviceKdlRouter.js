import express from "express";
const router = express.Router();
import DeviceKdlController from "../../../controller/mainTable/devices/DeviceKdlController";

router.get("/kdl/:id", DeviceKdlController.getAllKdl);

export default router;
