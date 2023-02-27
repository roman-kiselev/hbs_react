import express from "express";
import FlatsController from "../../controller/objects/FlatsController.js";
const router = express.Router();


router.post('/', FlatsController.createFlats)
router.get('/', FlatsController.getAllFlats)
router.get('/:id', FlatsController.getOneFlats)



export default router;