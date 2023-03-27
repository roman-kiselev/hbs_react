import express from "express";
const router = express.Router();
import RoleController from "../controller/RoleController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

// Создать
router.post("/", RoleController.createRole);
// Получить все
router.get(
    "/",
    authMiddleware,
    checkRoleMiddleware("admin"),
    RoleController.getAllRoles
);
// Получить одну
router.get("/:id", RoleController.getOneRole);
// Удалить один
router.delete("/:id");
// Редактирровать
router.put("/:id");

export default router;
