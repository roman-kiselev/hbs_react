import express from "express";
const router = express.Router();

import MainTableSectionController from "../../../controller/mainTable/objects/MainTableSectionController.js";

router.get("/sections/:id", MainTableSectionController.getAllSections);

export default router;
