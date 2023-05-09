import express from "express";
const userRouter = express.Router();
import { UsersController } from "../../controllers";
import { authMiddlewaare } from "../../middlewares";

userRouter.post("/registration", UsersController.registration);
userRouter.post("/login", UsersController.login);
userRouter.get("/check", authMiddlewaare, UsersController.check);

export default userRouter;
