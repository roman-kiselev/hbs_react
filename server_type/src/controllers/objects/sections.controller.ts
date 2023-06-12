import { Request, Response } from "express";
import { CreateSectionsDto } from "../../dto";
import { SectionsService } from "../../services/objects";

class SectionsController {
    async createSections(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const dto = req.body as CreateSectionsDto;

            const section = await SectionsService.createSections(
                Number(id),
                dto
            );

            return res.status(201).json(section);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllSections(req: Request, res: Response) {
        try {
            const sections = await SectionsService.getAllSections();
            return res.status(200).json(sections);
        } catch (e) {
            console.log(e);
        }
    }

    async getSectionsById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const section = await SectionsService.getSectionsById(Number(id));
            return res.status(200).json(section);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new SectionsController();
