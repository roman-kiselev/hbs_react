import express from "express";
import UserController from "../controller/userController.js";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/auth", authMiddleware, UserController.check);
router.get(
    "/",
    authMiddleware,
    checkRoleMiddleware("admin"),
    UserController.getAll
);
router.delete(
    "/:id",
    authMiddleware,
    checkRoleMiddleware("admin"),
    UserController.dropUser
);

export default router;
