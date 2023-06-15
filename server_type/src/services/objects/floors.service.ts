import { CreateFloorsDto } from "../../dto";
import { ApiError } from "../../lib";
import { Floors, Sections } from "../../models";

class FloorsService {
    async createFloor(id: number, dto: CreateFloorsDto) {
        try {
            // Проверяем существует ли секция
            const section = await Sections.findByPk(id);
            if (!section) {
                return ApiError.badRequest("Такой секции нет");
            }
            const floor = await Floors.create({
                value: dto.value,
                sectionId: id,
            });
            if (!floor) {
                return ApiError.badRequest("Не удаётся создать этаж");
            }
            return floor;
        } catch (e) {
            console.log(e);
        }
    }

    // Получим все объекты
    async getAllFloors(): Promise<Floors[] | ApiError> {
        try {
            const floors = await Floors.findAll({
                include: { all: true },
            });
            if (!floors) {
                return ApiError.badRequest("Не удаётся получить все этажи");
            }
        } catch (e) {
            console.log(e);
        }
    }

    // Получить один объект
    async getFloorById(id: number): Promise<Floors | ApiError> {
        try {
            const floor = await Floors.findByPk(id);
            if (!floor) {
                return ApiError.badRequest("Не удаётся получить этаж");
            }
            return floor;
        } catch (e) {
            console.log(e);
        }
    }

    // Получить объект по номеру секции
    async getFloorByValue(value: number): Promise<Floors | ApiError> {
        try {
            const floor = await Floors.findOne({
                where: { value },
            });
            if (!floor) {
                return ApiError.badRequest("Не удаётся получить этаж");
            }
            return floor;
        } catch (e) {
            console.log(e);
        }
    }

    // Обновить

    async updateFloor(id: number, dto: CreateFloorsDto) {
        try {
            const floor = await Floors.update(dto, {
                where: { id },
            });
            if (!floor) {
                return ApiError.badRequest("Не удаётся обновить этаж");
            }
            return floor;
        } catch (e) {
            console.log(e);
        }
    }

    // Удаляем этаж
    async deleteFloor(id: number) {
        try {
            const floor = await Floors.destroy({
                where: { id },
            });
            if (!floor) {
                return ApiError.badRequest("Не удаётся удалить этаж");
            }
            return floor;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new FloorsService();
