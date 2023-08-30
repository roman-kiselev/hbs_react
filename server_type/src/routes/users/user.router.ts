import express from "express";
import { UsersController } from "../../controllers";
import { authMiddlewaare } from "../../middlewares";
const userRouter = express.Router();

userRouter.post("/login", UsersController.login);
userRouter.post("/registration", UsersController.registration);

userRouter.get("/auth", authMiddlewaare, UsersController.check);

export default userRouter;
