import express from "express";
import { RoleController } from "../../controllers";
const roleRouter = express.Router();

roleRouter.get("/", RoleController.getAll);
roleRouter.get("/getByName", RoleController.getRoleByName);
roleRouter.post("/", RoleController.create);
roleRouter.get("/:id", RoleController.getRoleById);
roleRouter.put("/:id", RoleController.updateRole);
roleRouter.delete("/:id", RoleController.deleteRole);

export default roleRouter;
