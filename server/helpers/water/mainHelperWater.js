/**
 * @typedef {Object} WaterMeterRequestBody
 * @property {number} section - Номер секции.
 * @property {number} floors - Количество этажей.
 * @property {number} flat - Номер квартиры.
 * @property {number} office - Номер офиса.
 * @property {number} kdl - КДЛ.
 * @property {number} channelCool - Холодная вода.
 * @property {number} channelHot - Горячая вода.
 * @property {number} numberMeterCool - Номер счетчика холодной воды.
 * @property {number} numberMeterHot - Номер счетчика горячей воды.
 * @property {number} sumMeterCool - Показания счетчика холодной воды.
 * @property {number} sumMeterHot - Показания счетчика горячей воды.
 * @property {number} userId - Идентификатор пользователя.
 * @property {string} comment - Комментарий.
 * @property {number} objectBuildId - Идентификатор объекта.
 */

/**
 *
 * @typedef {Object} CoolWater
 * @property {number} section - Номер секции.
 * @property {number} floors - Количество этажей.
 * @property {number} flat - Номер квартиры.
 * @property {number} office - Номер офиса.
 * @property {number} kdl - КДЛ.
 * @property {number} channelCool - Холодная вода.
 * @property {number} numberMeterCool - Номер счетчика холодной воды.
 * @property {number} sumMeterCool - Показания счетчика холодной воды.
 * @property {number} userId - Идентификатор пользователя.
 * @property {string} comment - Комментарий.
 * @property {number} objectBuildId - Идентификатор объекта.
 */

/**
 *
 * @typedef {Object} HotWater
 * @property {number} section - Номер секции.
 * @property {number} floors - Количество этажей.
 * @property {number} flat - Номер квартиры.
 * @property {number} office - Номер офиса.
 * @property {number} kdl - КДЛ.
 * @property {number} channelHot - Горячая вода.
 * @property {number} numberMeterHot - Номер счетчика горячей воды.
 * @property {number} sumMeterHot - Показания счетчика горячей воды.
 * @property {number} userId - Идентификатор пользователя.
 * @property {string} comment - Комментарий.
 * @property {number} objectBuildId - Идентификатор объекта.
 */

/**
 * @description Функция возвращает объект для создания счетчиков холодной и горячей воды
 * @param {WaterMeterRequestBody} body
 * @returns {{coolWater: CoolWater, hotWater: HotWater}}
 *  */
export const getWaterMeter = (body) => {
    return {
        coolWater: {
            section: body.section,
            floor: body.floors,
            flat: body.flat ? body.flat : 0,
            office: body.office ? body.office : 0,
            typeMeter: "Счётчик холодной воды",
            numberKdl: body.kdl,
            numberAsr: body.channelCool,
            numberMeter: body.numberMeterCool,
            sumMeter: body.sumMeterCool,
            objectBuildId: body.objectBuildId,
            comment: body.comment,
            userId: body.userId,
        },
        hotWater: {
            section: body.section,
            floor: body.floors,
            flat: body.flat ? body.flat : 0,
            office: body.office ? body.office : 0,
            typeMeter: "Счётчик горячей воды",
            numberKdl: body.kdl,
            numberAsr: body.channelHot,
            numberMeter: body.numberMeterHot,
            sumMeter: body.sumMeterHot,
            objectBuildId: body.objectBuildId,
            comment: body.comment,
            userId: body.userId,
        },
    };
};
