import pkg from "sequelize";
import sequelize from "../../db.js";
import { getWaterMeter } from "../../helpers/water/mainHelperWater.js";
import Models from "../../models/models.js";
import StatusRadioService from "../statusRadio/StatusRadioService.js";
const { QueryTypes } = pkg;
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

    /**
     * @description Возвращает все уникальные этажи для одного дома
     * @param {number} objectBuildId
     * @returns {[]}
     */
    async _getUniqFloors(objectBuildId) {
        try {
            const floors = await sequelize.query(
                `
            SELECT distinct(floor)
            from hbs_react.main_meters
            where objectBuildId = :objectBuildId
            order by floor asc;
            
            `,
                {
                    replacements: { objectBuildId: objectBuildId },
                    type: QueryTypes.SELECT,
                }
            );
            return floors;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * @description Возвращает все уникальные линии для одного дома и этажа
     * @param {number} objectBuildId
     * @param {number} numberFloor
     * @returns {[]}
     */
    async _getUniqLine(objectBuildId, numberFloor) {
        try {
            const lines = await sequelize.query(
                `
            SELECT DISTINCT
                (line)
            FROM
                hbs_react.main_meters
            WHERE
                objectBuildId = :objectBuildId and floor= :numberFloor
            order by line asc;
            `,
                {
                    replacements: {
                        objectBuildId: objectBuildId,
                        numberFloor: numberFloor,
                    },
                    type: QueryTypes.SELECT,
                }
            );
            return lines;
        } catch (e) {
            console.log(e);
        }
    }

    async _getMetersByNumberLine(objectBuildId, numberFloor, line) {
        try {
            const meters = await sequelize.query(
                `
            select * 
            FROM hbs_react.main_meters
            where objectBuildId=:objectBuildId and floor = :numberFloor and line = :line
            order by line asc;
            `,
                {
                    replacements: {
                        objectBuildId: objectBuildId,
                        numberFloor: numberFloor,
                        line: line,
                    },
                    type: QueryTypes.SELECT,
                }
            );

            return meters;
        } catch (e) {}
    }

    async _prepareStatus(idMeter) {
        try {
        } catch (e) {
            console.log(e);
        }
    }

    async getLinesForOneFloor(objectBuildId, floor) {
        try {
            // Получаем уникальные стояки
            const uniqueLines = await sequelize.query(
                `
                SELECT DISTINCT
                (line)
                FROM
                    hbs_react.main_meters
                WHERE
                    objectBuildId = :objectBuildId
                ORDER BY line ASC;
                `,
                {
                    replacements: {
                        objectBuildId: objectBuildId,
                    },
                    type: QueryTypes.SELECT,
                }
            );
            const data = [];
            for (const { line } of uniqueLines) {
                const linePlusMeters = await sequelize.query(
                    `
                SELECT 
                    *
                FROM
                    hbs_react.main_meters
                WHERE
                    objectBuildId = :objectBuildId AND floor = :floor AND line = :line
                ORDER BY line ASC;
                `,
                    {
                        replacements: {
                            objectBuildId: objectBuildId,
                            floor: floor,
                            line: line,
                        },
                        type: QueryTypes.SELECT,
                    }
                );

                const currentStatus = await StatusRadioService.getCurrentStatus(
                    linePlusMeters[0].id
                );

                data.push({
                    line,
                    meter: linePlusMeters,
                    status:
                        currentStatus !== undefined
                            ? currentStatus.status
                            : null,
                });
            }

            return data;
        } catch (e) {
            console.log(e);
        }
    }

    async getMetersByLineAndFloor(objectBuildId) {
        try {
            const floors = await this._getUniqFloors(objectBuildId);

            const data = [];
            for (const { floor } of floors) {
                const lines = await this._getUniqLine(objectBuildId, floor);
                for (const { line } of lines) {
                    const meters = await this._getMetersByNumberLine(
                        objectBuildId,
                        floor,
                        line
                    );
                    data.push({
                        line,
                        meter: meters,
                    });
                }
            }

            return data;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new WaterService();
