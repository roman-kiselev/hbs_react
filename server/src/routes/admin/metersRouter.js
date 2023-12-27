import express from "express";
const router = express.Router();

// Получить все
router.get("/");
// Получить один
router.get("/:id");
// Добавить
router.post("/");
// Редактировать
router.put("/:id");
// Удалить
router.delete("/:id");

export default router;
