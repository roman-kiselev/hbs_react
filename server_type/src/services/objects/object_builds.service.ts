import { CreateObjectBuildsDto } from "../../dto";
import { IObjectBuildsService } from "../../interfaces";
import ApiError from "../../lib";
import { ObjectsBuilds } from "../../models";
import { FilesService } from "../files";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
class ObjectsBuildsService implements IObjectBuildsService {
    // Сошздаём объекты
    async createObjectBuilds(
        dto: CreateObjectBuildsDto,
        img: any
    ): Promise<ObjectsBuilds | ApiError> {
        try {
            const { name, description } = dto;

            // const fileName = FilesService.createFile(img);
            // if (typeof fileName !== "string") {
            //     return ApiError.badRequest("Не удаётся создать объект");
            // }

            let fileName = uuidv4() + ".jpg";
            const filePath = path.resolve(
                __dirname,
                "..",
                "..",
                "static",
                fileName
            );
            // console.log(filePath);
            // if (!fs.existsSync(filePath)) {
            //     fs.mkdirSync(filePath, { recursive: true });
            // }

            await img.mv(filePath);
            const object = await ObjectsBuilds.create({
                ...dto,
                img: fileName,
            });
            if (!object) {
                return ApiError.badRequest("Не удаётся создать объект");
            }
            return object;
        } catch (e) {
            console.log(e);
        }
    }

    // Получим все объекты
    async getAllObjectBuilds(): Promise<ObjectsBuilds[] | ApiError> {
        try {
            const objects = await ObjectsBuilds.findAll();
            if (!objects) {
                return ApiError.badRequest("Не удаётся получить все объекты");
            }

            return objects;
        } catch (e) {
            console.log(e);
        }
    }

    // Получить один объект
    async getObjectBuildsById(id: number): Promise<ObjectsBuilds | ApiError> {
        try {
            const object = await ObjectsBuilds.findByPk(id);
            if (!object) {
                return ApiError.badRequest("Не удаётся получить объект");
            }
            return object;
        } catch (e) {
            console.log(e);
        }
    }

    // Обновить
    async updateObjectBuilds(
        id: number,
        dto: CreateObjectBuildsDto
    ): Promise<ObjectsBuilds | ApiError> {
        try {
            const object = await ObjectsBuilds.findByPk(id);
            if (!object) {
                return ApiError.badRequest("Не удаётся обновить объект");
            }
            //await object.update(dto);
            return object;
        } catch (e) {
            console.log(e);
        }
    }

    // Удалить
    async deleteObjectBuilds(id: number): Promise<ObjectsBuilds | ApiError> {
        try {
            const object = await ObjectsBuilds.findByPk(id);
            if (!object) {
                return ApiError.badRequest("Не удаётся удалить объект");
            }
            await object.destroy();
            return object;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new ObjectsBuildsService();
