import { CreateMainWaterDto } from "../../dto";
import { IGetAllByIdUserAndObjectQuery } from "../../interfaces";
import { ApiError, WaterMeter } from "../../lib";
import { MainAddMeter } from "../../models";
import { TypeMeters } from "../../consts";
import { Op } from "sequelize";

class MainWater {
    async addNewWaterMeter(dto: CreateMainWaterDto) {
        try {
            const coolMeter = WaterMeter(dto).getCoolMeter();
            const hotMeter = WaterMeter(dto).getHotMeter();

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
    async getAllByIdUserAndObject(query: IGetAllByIdUserAndObjectQuery) {
        try {
            let { userId, objectBuildId, limit, page } = query;
            page = page || 1;
            limit = limit || 6;
            let offset = page * limit - limit;
            const listMeters = await MainAddMeter.findAndCountAll({
                where: {
                    objectBuildId,
                    userId: userId === 0 ? {} : userId,
                    [Op.or]: [
                        { typeMeter: TypeMeters.COOL },
                        { typeMeter: TypeMeters.HOT },
                    ],
                },
                limit,
                offset,
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
