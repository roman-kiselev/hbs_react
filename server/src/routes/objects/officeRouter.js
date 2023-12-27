import express from "express";
import OfficeController from "../../controller/objects/OfficeController.js";

const router = express.Router();


router.post('/', OfficeController.createOffice)
router.get('/', OfficeController.getAllOffice)
router.get('/:id', OfficeController.getOneOffice)



export default router;