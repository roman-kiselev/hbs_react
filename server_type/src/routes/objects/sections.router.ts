import express from "express";
import { SectionsController } from "../../controllers/objects";
const sectionsRouter = express.Router();

sectionsRouter.get("/", SectionsController.getAllSections);
sectionsRouter.get("/:id", SectionsController.getSectionsById);
sectionsRouter.post("/:id", SectionsController.createSections);

export default sectionsRouter;
