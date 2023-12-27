import express from "express";
import FloorsController from "../../controller/objects/FloorsController.js";

const router = express.Router();

router.post('/', FloorsController.createFloors)
router.get('/', FloorsController.getAllFloors)
router.get('/:id', FloorsController.getOneFloors)



export default router;