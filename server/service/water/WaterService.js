import { getWaterMeter } from "../../helpers/water/mainHelperWater.js";
import Models from "../../models/models.js";
class WaterService {
    /**
     * @description Возвращает все счетчики воды для одного объекта
     * @param {number} objectBuildId
     * @returns {[]}
     */
    async findAllMetersForOneObject(objectBuildId) {
        try {
            const meters = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                },
            });
            if (!meters) {
                return null;
            }
            return meters;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * @description Создание счетчиков воды
     * @param {body<Request.body>} body
     * @returns {[{coolWater: CoolWater, hotWater: HotWater}]}
     */
    async createAsrTwo(body) {
        try {
            const coolWater = getWaterMeter(body).coolWater;
            const hotWater = getWaterMeter(body).hotWater;

            const waterMeter = await Models.MainAddMeter.bulkCreate([
                coolWater,
                hotWater,
            ]);
            if (!waterMeter) {
                return null;
            }

            return waterMeter;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new WaterService();
