import express from "express";
import DeskController from "../../controller/desk/DeskController.js";
const deskRouter = express.Router();

deskRouter.get("/", DeskController.getAll);
deskRouter.get("/:id", DeskController.getOne);
deskRouter.get("/check", DeskController.getAllWhereCheck);
deskRouter.post("/", DeskController.create);
deskRouter.delete("/:id", DeskController.delete);
deskRouter.put("/:id", DeskController.changeStatus);

export default deskRouter;
