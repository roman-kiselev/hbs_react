import { Request, Response } from "express";
import { CreateObjectBuildsDto } from "../../dto";
import ApiError from "../../lib";
import { FilesService, ObjectsBuildsService } from "../../services";
import { ObjectsBuilds } from "../../models";

class ObjectsBuildsController {
    async createObject(req: Request, res: Response) {
        try {
            const dto = req.body as CreateObjectBuildsDto;
            const { img } = req.files as {
                [img: string]: Express.Multer.File[];
            };
            const obj = await ObjectsBuildsService.createObjectBuilds(dto, img);

            return res.status(201).json(obj);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllObjects(req: Request, res: Response) {
        try {
            const objects = await ObjectsBuildsService.getAllObjectBuilds();
            return res.status(200).json(objects);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new ObjectsBuildsController();
