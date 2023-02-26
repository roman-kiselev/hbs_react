import express from "express";
const router = express.Router();
import RoleController from "../controller/RoleController.js";

// Создать
router.post('/', RoleController.createRole)
// Получить все
router.get('/', RoleController.getAllRoles)
// Получить одну
router.get('/:id', RoleController.getOneRole)
// Удалить один
router.delete('/:id')
// Редактирровать
router.put('/:id')



export default router;