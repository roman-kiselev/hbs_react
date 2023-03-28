import express from "express";
const router = express.Router();

import MainTableSectionController from "../../../controller/mainTable/objects/MainTableSectionController";

router.get("/sections", MainTableSectionController.getAllSections);

export default router;
