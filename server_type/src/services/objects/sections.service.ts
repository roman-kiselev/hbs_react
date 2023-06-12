import { ObjectsBuildsService } from ".";
import CreateSectionsDto from "../../dto/createDto/objects/CreateSectionsDto";
import ApiError from "../../lib";
import { ObjectsBuilds, Sections } from "../../models/objects";

class SectionsService {
    async createSections(
        id: number,
        dto: CreateSectionsDto
    ): Promise<Sections | ApiError> {
        try {
            // Проверяем существует ли объект
            console.log(id, dto);
            const object = await ObjectsBuilds.findByPk(id);
            if (!object) {
                return ApiError.notFound("Объект не найден");
            }
            const section = await Sections.create({
                value: dto.value,
                objectId: id,
            });
            if (!section) {
                return ApiError.badRequest("Не удаётся создать секцию");
            }
            return section;
        } catch (e) {
            console.log(e);
        }
    }

    // Получим все объекты
    async getAllSections(): Promise<Sections[] | ApiError> {
        try {
            const sections = await Sections.findAll({
                include: { all: true },
            });
            if (!sections) {
                return ApiError.badRequest("Не удаётся получить все секции");
            }
            return sections;
        } catch (e) {
            console.log(e);
        }
    }

    // Получить один объект
    async getSectionsById(id: number): Promise<Sections | ApiError> {
        try {
            const section = await Sections.findByPk(id);
            if (!section) {
                return ApiError.badRequest("Не удаётся получить секцию");
            }
            return section;
        } catch (e) {
            console.log(e);
        }
    }

    // Получить объект по номеру секции
    async getSectionsByValue(value: number): Promise<Sections | ApiError> {
        try {
            const section = await Sections.findOne({
                where: { value },
            });
            if (!section) {
                return ApiError.badRequest("Не удаётся получить секцию");
            }
            return section;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new SectionsService();
