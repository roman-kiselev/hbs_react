import express from "express";
import KdlMainTableController from "../../controller/devices/kdlMainTableController.js";
const router = express.Router();

// Получаем все записи из базы данных без повторов
router.get("/", KdlMainTableController.getAllUnique);
router.get("/getChannel", KdlMainTableController.getChannel);

export default router;
