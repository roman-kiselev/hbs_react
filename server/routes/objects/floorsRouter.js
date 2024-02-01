import express from "express";
import FloorsController from "../../controller/objects/FloorsController.js";

const router = express.Router();
router.get("/", FloorsController.getAllFloors);
router.get("/:id", FloorsController.getOneFloors);
router.get("/getUniq/:id", FloorsController.getUniqueFloors);
router.post("/", FloorsController.createFloors);

export default router;
