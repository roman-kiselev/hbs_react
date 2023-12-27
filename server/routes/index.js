import express from "express";
const router = express.Router();

import brandRouter from "../routes/admin/brandsRouter.js";
import kdlMainTableRouter from "../routes/devices/kdlMainTableRouter.js";
import mainTableSectionRouter from "../routes/mainTable/objects/mainTableSectionRouter.js";
import deskRouter from "./desk/DeskRouter.js";
import DeviceKdlRouter from "./mainTable/devices/DeviceKdlRouter.js";
import flatsRouter from "./objects/flatsRouter.js";
import floorsRouter from "./objects/floorsRouter.js";
import lineRoutes from "./objects/lineRoutes.js";
import objectsRouter from "./objects/objectsRouter.js";
import officeRouter from "./objects/officeRouter.js";
import sectionsRouter from "./objects/sectionsRouter.js";
import roleRouter from "./roleRouter.js";
import testElectricalMeterRouter from "./test/testElectricalMeterRouter.js";
import testHeatMeterRouter from "./test/testHeatMeterRouter.js";
import testWaterMeterRouter from "./test/testWaterMeterRouter.js";
import userRouter from "./userRouter.js";
import waterRouter from "./water/waterRouter.js";

// User
router.use("/user", userRouter);
// Role
router.use("/role", roleRouter);
// Object
router.use("/object", objectsRouter);
//
router.use("/flats", flatsRouter);
router.use("/floors", floorsRouter);
router.use("/line", lineRoutes);
router.use("/office", officeRouter);
router.use("/sections", sectionsRouter);

// Test
router.use("/testAddWater", testWaterMeterRouter);

router.use("/testAddHeat", testHeatMeterRouter);

router.use("/testElectrical", testElectricalMeterRouter);

// Устройства
router.use("/deviceKdl", kdlMainTableRouter);

// Роутер от общей таблицы
router.use("/mainTable", mainTableSectionRouter, DeviceKdlRouter);
// Роутер создания брендов
router.use("/brands", brandRouter);

//
router.use("/water", waterRouter);
//

router.use("/desk", deskRouter);

export default router;
