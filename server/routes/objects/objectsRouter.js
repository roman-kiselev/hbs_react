import express from "express";
import ObjectsController from "../../controller/objects/ObjectsController.js";
const router = express.Router()


router.post('/', ObjectsController.createObject)
router.get('/', ObjectsController.getAll)

export default router;

