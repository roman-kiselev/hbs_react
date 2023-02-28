import express from "express";
import TestWaterMeterController from "../../controller/test/testWaterMeterController.js";
const router = express.Router();


router.post('/', TestWaterMeterController.addNewMeter)



export default router;