import express from "express";
import SectionsController from "../../controller/objects/SectionsController.js";

const router = express.Router();


router.post('/', SectionsController.createSections)
router.get('/', SectionsController.getAllSections)
router.get('/:id', SectionsController.getOneSections)



export default router;