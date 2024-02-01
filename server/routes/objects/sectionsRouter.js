import express from "express";
import SectionsController from "../../controller/objects/SectionsController.js";

const router = express.Router();

router.get("/", SectionsController.getAllSections);
router.get("/:id", SectionsController.getOneSections);
router.get("/getUniq/:id", SectionsController.getUniqueSection);
router.post("/", SectionsController.createSections);

export default router;
