import pkg, { Sequelize } from "sequelize";
import XLSX from "xlsx";
import sequelize from "../../db.js";
import Models from "../../models/models.js";
import createHeatTemplate from "../../service/headersConfig/createHeatTemplate.js";
import HeadersElectricalConfig from "../../service/headersConfig/headersElectrical/HeadersElectricalConfig.js";
import { getElectricalMetersByNumberFlat } from "../../service/serviceElectrical/serviceElectrical.js";
const { Op } = pkg;

class TestElectricalMeterController {
    async createMeter(req, res) {
        try {
            const {
                section,
                floor,
                flat,
                office,
                line,
                numberMeter,
                sumMeter,
                comment,
                objectBuildId,
                userId,
            } = req.body;

            const newMeter = await Models.MainAddMeter.create({
                section,
                floor,
                flat: flat ? flat : 0,
                office: office ? office : 0,
                line,
                typeMeter: "Счётчик электроэнергии",
                numberMeter,
                sumMeter,
                objectBuildId,
                comment,
                userId,
            });

            return res.json({ newMeter });
        } catch (e) {
            console.log(e);
        }
    }

    async getAllMeters(req, res) {
        try {
            let { userId, objectBuildId, limit, page } = req.query;

            page = Number(page) || 1;
            limit = Number(limit) || 6;
            let offset = page * limit - limit;

            let typeMeter = "Счётчик электроэнергии";

            const meters = await Models.MainAddMeter.findAndCountAll({
                where: {
                    objectBuildId,
                    // userId,
                    typeMeter,
                },
                limit,
                offset,
                order: [["createdAt", "DESC"]],
            });

            return res.json({ meters });
        } catch (e) {
            console.log(e);
        }
    }

    async editMeterById(req, res) {
        try {
            const { id } = req.params;
            const {
                floor,
                flat,
                office,
                line,
                section,
                numberMeter,
                sumMeter,
                comment,
            } = req.body;

            const meter = await Models.MainAddMeter.findByPk(id);

            // Проверить что все поля не равны нулю
            if (floor !== 0 && flat !== 0 && line !== 0 && section !== 0) {
                await meter.update({
                    floor,
                    flat,
                    office,
                    line,
                    section,
                    numberMeter,
                    sumMeter,
                    comment,
                });

                return res.json({ meter });
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getExcelAllElectricalMeterInObject(req, res) {
        try {
            // Получаем все счётчики электроэнергии в excel
            // Достаём id объекта
            const { objectBuildId } = req.query;

            const meters = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                    typeMeter: "Счётчик электроэнергии",
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
            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "Счётчики электроэнергии"
            );
            const buffer = XLSX.write(workbook, {
                type: "buffer",
                bookType: "xlsx",
            });
            // res.setHeader(
            //     "Content-Disposition",
            //     "attachment; filename=meters.xlsx"
            // );
            // res.type(
            //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            // );
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
                                    typeMeter: "Счётчик электроэнергии",
                                },
                                { transaction: t }
                            );
                        } else {
                            repeatMeters.push(meter);
                        }
                    }

                    return res.json({ repeatMeters, success: true });
                } catch (e) {
                    //await transaction.rollback();
                    console.log(e);
                }
            });

            //const meters = await Models.MainAddMeter.bulkCreate(jsonData);
        } catch (e) {
            console.log(e);
        }
    }

    // Получим все уникальные линии электроэнергии

    async getAllLines(req, res) {
        try {
            const { objectBuildId, line } = req.query;
            const lines = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                    typeMeter: "Счётчик электроэнергии",
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

    async getTemplateElectrical(req, res) {
        try {
            // Получаем с фронтенда данные для заполнения шаблона
            // Заголовки берём из serviceHeaders
            // Там функция принимает на вход квартиру, номер счётчика, секцию, этаж, данные из query
            const { objectBuildId, line, template } = req.query;
            const meters = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                    typeMeter: "Счётчик электроэнергии",
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

            // Получаем максимальное значение квартиры
            const maxFlat = await Models.MainAddMeter.findOne({
                where: {
                    objectBuildId,
                    typeMeter: "Счётчик электроэнергии",
                    line,
                },
                attributes: [
                    [sequelize.fn("MAX", sequelize.col("flat")), "flat"],
                ],
                raw: true,
            });
            let arrLink = [
                "секция_TEST_C2000-Ethernet_вода",
                "ID=",
                "ClassName=TC2000EthernetChannel",
                "Активность=Нет",
                "Описание=секция_TEST_C2000-Ethernet_вода",
                "IP Адрес=192.168.10.1",
                "Порт=1",
                "Режим работы=Надёжный",
                "Операторы=",
                "Комментарий=",
            ];

            // Заголовок листа
            const nameSheet = "Счётчики электроэнергии";

            switch (template) {
                case "Энергомера СЕ102-S6/R5 AK":
                    const listMeters = [];
                    meters.map(({ flat, numberMeter, section, floor }) => {
                        let preparedDevice =
                            HeadersElectricalConfig.getTMagicDevice_RS485_Interface(
                                flat,
                                numberMeter,
                                section,
                                floor,
                                maxFlat.flat
                            );
                        listMeters.push(preparedDevice);
                    });

                    const arrInterface = [
                        "",
                        "[RS-485] Энергомера СЕ102/102 S7J",
                        "ID=",
                        "ParentID=",
                        "ClassName=TMagicDevice_RS485_Interface",
                        "MagicXML=energomera3.device",
                        "Активность=Да",
                        "Скорость порта=9600",
                        "Описание=[RS-485] Энергомера СЕ102/102 S7J",
                        "Число неответов до потери=3",
                        "Пауза между командами, мсек=100",
                        "Тайм-аут чтения, мсек=1000",
                        "Задержка между счётчиками, мсек=100",
                        "Совместимость с Карат-911=Нет",
                        "Режим работы=Основной",
                        "Комментарий=",
                    ];

                    const buffer = createHeatTemplate(
                        listMeters,
                        arrInterface,
                        arrLink,
                        nameSheet
                    );

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

    async searchByNumber(req, res) {
        try {
            const { numberFlat, objectId, limit, page } = req.query;

            const listFlats = await getElectricalMetersByNumberFlat(
                numberFlat,
                objectId,
                limit,
                page
            );

            return res.json({ listFlats });
        } catch (e) {
            console.log(e);
        }
    }

    // Удаление по id счётчика
    async deleteMeter(req, res) {
        try {
            const { id } = req.params;

            const meter = await Models.MainAddMeter.destroy({
                where: {
                    id,
                    typeMeter: "Счётчик электроэнергии",
                },
            });

            return res.json({ meter });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new TestElectricalMeterController();
