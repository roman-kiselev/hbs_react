// Контроллер для списка счётчиков тепла
import Models from "../../models/models.js";
import XLSX from "xlsx";
import sequelize from "../../db.js";
import { Sequelize } from "sequelize";
import pkg from "sequelize";
import createHeatTemplate from "../../service/headersConfig/createHeatTemplate.js";
import HeadersHeatConfig from "../../service/headersConfig/headersHeat/HeadersHeatConfig.js";
const { Op } = pkg;

class TestHeatMeterController {
    // Создадим счётчик тепла
    async addNewMeter(req, res) {
        try {
            const {
                section,
                floor,
                flat,
                line,
                numberMeter,
                sumMeter,
                objectBuildId,
                userId,
            } = req.body;

            const heatMeter = await Models.MainAddMeter.create({
                section: section,
                floor: floor,
                flat: flat,
                typeMeter: "Счётчик тепла",
                line: line,
                numberMeter: numberMeter,
                sumMeter: sumMeter,
                objectBuildId,
                userId,
            });

            return res.json({ heatMeter });
        } catch (e) {
            console.log(e);
        }
    }

    async getAllHeatMeters(req, res) {
        try {
            let { userId, objectId, limit, page } = req.query;

            page = Number(page) || 1;
            limit = Number(limit) || 6;
            let offset = page * limit - limit;

            let typeMeter = "Счётчик тепла";

            const heatMeters = await Models.MainAddMeter.findAndCountAll({
                where: {
                    objectBuildId: objectId,
                    userId: userId,
                    typeMeter: typeMeter,
                },
                limit,
                offset,
                order: [["createdAt", "DESC"]],
            });

            return res.json({ heatMeters });
        } catch (e) {
            console.log(e);
        }
    }

    async editHeatMeterById(req, res) {
        try {
            const { id } = req.params;

            const { floor, flat, section, line, numberMeter, sumMeter } =
                req.body;

            console.log(floor, flat, section, line, numberMeter, sumMeter);
            const heatMeter = await Models.MainAddMeter.findByPk(id);

            await heatMeter.update({
                floor,
                flat,
                section,
                line,
                numberMeter,
                sumMeter,
            });

            return res.json({ heatMeter });
        } catch (e) {
            console.log(e);
        }
    }

    async getExcelAllHeatMeterInObject(req, res) {
        try {
            // Получаем все счётчики электроэнергии в excel
            // Достаём id объекта
            const { objectBuildId } = req.query;

            const meters = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                    typeMeter: "Счётчик тепла",
                },
                attributes: [
                    "id",
                    "section",
                    "floor",
                    "flat",
                    "line",
                    "numberMeter",
                    "sumMeter",
                    "typeMeter",
                ],
                order: [["createdAt", "DESC"]],
                raw: true,
            });

            const worksheet = XLSX.utils.json_to_sheet(meters);
            // добавление заголовков в ячейки
            worksheet["A1"] = { t: "s", v: "ID" };
            worksheet["B1"] = { t: "s", v: "Секция" };
            worksheet["C1"] = { t: "s", v: "Этаж" };
            worksheet["D1"] = { t: "s", v: "Квартира" };
            worksheet["E1"] = { t: "s", v: "Линия" };
            worksheet["F1"] = { t: "s", v: "Номер счётчика" };
            worksheet["G1"] = { t: "s", v: "Показания" };
            worksheet["H1"] = { t: "s", v: "Тип счётчика" };
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Счётчики тепла");
            const buffer = XLSX.write(workbook, {
                type: "buffer",
                bookType: "xlsx",
            });

            res.send(buffer);
        } catch (e) {
            console.log(e);
        }
    }
    // Добавляем данные из excel
    async addAllMetersInObject(req, res) {
        try {
            const { objectBuildId, userId } = req.query;

            const { jsonData } = req.body;
            const data = JSON.parse(jsonData);

            // Создадим массив с повторяющимися счётчиками
            const repeatMeters = [];
            // Создаём транзакцию с помощью Sequelize

            await sequelize.transaction(async (t) => {
                try {
                    for (const d of data) {
                        const meter = await Models.MainAddMeter.findOne(
                            {
                                where: {
                                    numberMeter: d.numberMeter,
                                    objectBuildId,
                                },
                                raw: true,
                            },

                            { transaction: t }
                        );

                        if (!meter) {
                            await Models.MainAddMeter.create(
                                {
                                    section: d.section,
                                    floor: d.floor,
                                    flat: d.flat,
                                    line: d.line,
                                    numberMeter: d.numberMeter,
                                    sumMeter: d.sumMeter,
                                    objectBuildId,
                                    userId,
                                    typeMeter: "Счётчик тепла",
                                },
                                { transaction: t }
                            );
                        } else {
                            repeatMeters.push(meter);
                        }
                    }

                    return res.json({ repeatMeters, success: true });
                } catch (e) {
                    console.log(e);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    // Получим все уникальные линии тепла

    async getAllLines(req, res) {
        try {
            const { objectBuildId, line } = req.query;
            const lines = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                    line: {
                        [Op.not]: 0,
                    },
                },
                attributes: [
                    [Sequelize.fn("DISTINCT", Sequelize.col("line")), "line"],
                ],
                order: [["line", "ASC"]],
            });

            return res.json({ lines });
        } catch (e) {
            console.log(e);
        }
    }

    // Готовим шаблон к скачиванию

    async getTemplateHeat(req, res) {
        try {
            // Получаем с фронтенда данные для заполнения шаблона
            // Заголовки берём из serviceHeaders
            // Там функция принимает на вход квартиру, номер счётчика, секцию, этаж, данные из query
            const { objectBuildId, line, template } = req.query;
            const meters = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                    typeMeter: "Счётчик тепла",
                    line,
                },
                attributes: [
                    "id",
                    "section",
                    "floor",
                    "flat",
                    "line",
                    "numberMeter",
                    "sumMeter",
                    "typeMeter",
                ],
                order: [["floor", "DESC"]],
                raw: true,
            });
            //console.log(meters);
            switch (template) {
                case "MeterBus":
                    const listMeters = [];
                    meters.map(({ flat, numberMeter, section, floor }) => {
                        let preparedDevice =
                            HeadersHeatConfig.getTMBusUniversal_Heat_Counter(
                                flat,
                                numberMeter,
                                section,
                                floor
                            );
                        listMeters.push(preparedDevice);
                    });

                    const buffer = createHeatTemplate(listMeters);

                    return res.send(buffer);
                    break;
                case "Pulsar":
                    break;
                default:
                    return res.json({ message: "Шаблон не выбран" });
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default new TestHeatMeterController();
