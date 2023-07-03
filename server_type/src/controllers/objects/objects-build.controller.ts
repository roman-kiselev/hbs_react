import { Request, Response } from "express";
import { CreateObjectBuildsDto } from "../../dto";
import { ApiError } from "../../lib";
import { FilesService, ObjectsBuildsService } from "../../services";
import { ObjectsBuilds } from "../../models";

class ObjectsBuildsController {
    async createObject(req: Request, res: Response) {
        try {
            const dto = req.body as CreateObjectBuildsDto;
            console.log(dto);
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

    async getObjectById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const obj = await ObjectsBuildsService.getObjectBuildsById(
                Number(id)
            );
            return res.status(200).json(obj);
        } catch (e) {
            console.log(e);
        }
    }

    async getObjectByName(req: Request, res: Response) {
        try {
            const { name } = req.query;
            console.log(name);
            const obj = await ObjectsBuildsService.getObjectBuildsByName<
                typeof name
            >(name);
            return res.status(200).json(obj);
        } catch (e) {
            console.log(e);
        }
    }

    async updateObject(req: Request, res: Response) {
        try {
            const dto = req.body as CreateObjectBuildsDto;
            const { id } = req.params;
            const file = req.files as {
                [img: string]: Express.Multer.File[];
            };

            if (file) {
                const obj = await ObjectsBuildsService.updateObjectBuilds(
                    Number(id),
                    dto,
                    file.img
                );
                return res.status(201).json(obj);
            } else {
                const obj = await ObjectsBuildsService.updateObjectBuilds(
                    Number(id),
                    dto
                );
                return res.status(201).json(obj);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default new ObjectsBuildsController();
