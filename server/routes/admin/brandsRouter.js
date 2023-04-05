import express from "express";
const router = express.Router();
import BrandsController from "../../controller/admin/BrandsController.js";

// Получить все
router.get("/", BrandsController.getAllBrands);
// Получить один
router.get("/:id", BrandsController.getOneBrandById);
// Добавить
router.post("/", BrandsController.createBrands);
// Редактировать
router.put("/:id", BrandsController.updateBrands);
// Удалить
router.delete("/:id", BrandsController.deleteBrands);

export default router;
