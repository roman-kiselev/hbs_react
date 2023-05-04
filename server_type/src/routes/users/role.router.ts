import express from "express";
import { RoleController } from "../../controllers";
const roleRouter = express.Router();

roleRouter.post("/", RoleController.create);

export default roleRouter;
