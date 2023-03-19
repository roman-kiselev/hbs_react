import express from "express";
const router = express.Router();
import KdlMainTableController from "../../controller/devices/kdlMainTableController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

// Получаем все записи из базы данных без повторов
router.get("/", KdlMainTableController.getAllUnique);

export default router;
