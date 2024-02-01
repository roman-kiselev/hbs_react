import express from "express";
import ObjectsController from "../../controller/objects/ObjectsController.js";
const router = express.Router();

router.get("/", ObjectsController.getAll);
router.post("/", ObjectsController.createObject);

export default router;
