import express from "express";
const router = express.Router();

import userRouter from "./userRouter.js";
import roleRouter from "./roleRouter.js";
import objectsRouter from "./objects/objectsRouter.js";


// User
router.use('/user', userRouter)
// Role
router.use('/role', roleRouter)
// Object
router.use('/object', objectsRouter)



export default router;
