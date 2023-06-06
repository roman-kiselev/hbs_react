import express from "express";
import { EnRole } from "../../consts";
import { ObjectsBuildController } from "../../controllers";
import { checkRoleMiddleware } from "../../middlewares";
const objectBuildsRouter = express.Router();

objectBuildsRouter.get(
    "/",
    checkRoleMiddleware([EnRole.USER, EnRole.ADMIN]),
    ObjectsBuildController.getAllObjects
);
objectBuildsRouter.post("/", ObjectsBuildController.createObject);

export default objectBuildsRouter;
