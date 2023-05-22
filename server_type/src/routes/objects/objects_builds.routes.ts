import express from "express";
import { ObjectsBuildController } from "../../controllers";
const objectBuildsRouter = express.Router();

objectBuildsRouter.post("/", ObjectsBuildController.createObject);

export default objectBuildsRouter;
