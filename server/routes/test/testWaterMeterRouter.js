import express from "express";
import TestWaterMeterController from "../../controller/test/testWaterMeterController.js";
const router = express.Router();


router.post('/', TestWaterMeterController.addNewMeter)
router.get('/', TestWaterMeterController.getAllByIdUserAndObject)
router.post('/:id', TestWaterMeterController.getOneMeter)


export default router;