import { Op } from "sequelize";
import { TypeMeters } from "../../consts";
import { CreateMainWaterDto } from "../../dto";
import { IGetAllByObjectQuery, IOneWaterMeter } from "../../interfaces";
import { ApiError, WaterMeter } from "../../lib";
import { MainAddMeter } from "../../models";

class MainWater {
    // Проверка существования счётчика
    // По номеру в объекте
    private async findMeter(meter: IOneWaterMeter) {
        try {
            const { numberMeter, objectBuildId } = meter;
            const foundMeter = await MainAddMeter.findOne({
                where: {
                    numberMeter,
                    objectBuildId,
                },
            });
            if (foundMeter) {
                return foundMeter;
            }
            return false;
        } catch (e) {
            console.error(e);
        }
    }
    // Добавить счётчики воды
    async addNewWaterMeter(dto: CreateMainWaterDto) {
        try {
            const coolMeter: IOneWaterMeter = WaterMeter(dto).getCoolMeter();
            const hotMeter: IOneWaterMeter = WaterMeter(dto).getHotMeter();
            const foundCoolMeter = await this.findMeter(coolMeter);
            const foundHotMeter = await this.findMeter(hotMeter);
            // Проверяем существование счётчиков
            if (foundCoolMeter) {
                return ApiError.notFound(
                    `Счётчик с номером ${foundCoolMeter.numberMeter} уже существует`
                );
            }
            if (foundHotMeter) {
                return ApiError.notFound(
                    `Счётчик с номером ${foundHotMeter.numberMeter} уже существует`
                );
            }
            // Создаём счётчики
            const waterMeter = await MainAddMeter.bulkCreate([
                coolMeter,
                hotMeter,
            ]);
            if (!waterMeter) {
                return ApiError.badRequest("Не удаётся создать счётчики");
            }
            return waterMeter;
        } catch (e) {
            console.error(e);
        }
    }
    // Получаем все счётчики воды по id объекта
    async getAllByIdUserAndObject(query: IGetAllByObjectQuery) {
        try {
            let { objectId, limit, page } = query;

            page = page || 1;
            limit = limit || 6;
            let offset = page * limit - limit;
            const listMeters = await MainAddMeter.findAndCountAll({
                where: {
                    objectBuildId: Number(objectId),
                    [Op.or]: [
                        { typeMeter: TypeMeters.COOL },
                        { typeMeter: TypeMeters.HOT },
                    ],
                },
                limit: Number(limit),
                offset: Number(offset),
                order: [["id", "DESC"]],
            });

            if (!listMeters) {
                return ApiError.badRequest("Счётчики не найдены");
            }
            return listMeters;
        } catch (e) {
            console.error(e);
        }
    }
}

export default new MainWater();
