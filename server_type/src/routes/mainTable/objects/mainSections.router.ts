import express from "express";
import { MainSectionsController } from "../../../controllers";
const mainSectionRouter = express.Router();

mainSectionRouter.get("/sections", MainSectionsController.getAllSections);

export default mainSectionRouter;
