import chalk from "chalk";
import pkg from "sequelize";
import Models from "../../models/models.js";
import TestExcelService from "../../service/testExcel/TestExcelService.js";
import * as XLSX from "xlsx";
const { Op } = pkg;
import sequelize from "../../db.js";
import { getMetersByNumberFlat } from "../../service/serviceWater/serviceWater.js";
import HeadersWaterConfig from "../../service/headersConfig/headersWater/HeadersWaterConfig.js";
import createHeatTemplate from "../../service/headersConfig/createHeatTemplate.js";
import createWaterTemplate from "../../service/headersConfig/createWaterTemplate.js";

class TestWaterMeterController {
    async addNewMeter(req, res) {
        try {
            const {
                section,
                floors,
                flat,
                office,
                kdl,
                channelCool,
                channelHot,
                numberMeterCool,
                numberMeterHot,
                sumMeterCool,
                sumMeterHot,
                userId,
                objectId,
            } = req.body;

            const coolMeter = {
                section: section,
                floor: floors,
                flat: flat ? flat : 0,
                office: office ? office : 0,
                typeMeter: "Счётчик холодной воды",
                numberKdl: kdl,
                numberAsr: channelCool,
                numberMeter: numberMeterCool,
                sumMeter: sumMeterCool,
                objectBuildId: objectId,
                userId: userId,
            };

            const hotMeter = {
                section: section,
                floor: floors,
                flat: flat ? flat : 0,
                office: office ? office : 0,
                typeMeter: "Счётчик горячей воды",
                numberKdl: kdl,
                numberAsr: channelHot,
                numberMeter: numberMeterHot,
                sumMeter: sumMeterHot,
                objectBuildId: objectId,
                userId: userId,
            };

            const waterMeter = await Models.MainAddMeter.bulkCreate([
                coolMeter,
                hotMeter,
            ]);

            return res.json(waterMeter);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllByIdUserAndObject(req, res) {
        try {
            // Получаем данные для постраничной навигации
            let { userId, objectId, limit, page } = req.query;
            page = Number(page) || 1;
            limit = Number(limit) || 6;
            let offset = page * limit - limit;
            // Передаём тип счётчика с условием ИЛИ
            let typeMeterCool = "Счётчик холодной воды";
            let typeMeterHot = "Счётчик горячей воды";

            const listMeters = await Models.MainAddMeter.findAndCountAll({
                where: {
                    objectBuildId: objectId,
                    userId: userId === 0 ? {} : userId,
                    [Op.or]: [
                        { typeMeter: typeMeterCool },
                        { typeMeter: typeMeterHot },
                    ],
                },
                limit: limit,
                offset: offset,
                order: [["id", "DESC"]],
            });

            return res.json({ listMeters });
        } catch (e) {
            console.log(e);
        }
    }

    async getOneMeter(req, res) {
        try {
            // Получаем id счётчика
            const { id } = req.params;

            // Получаем данные о счётчике
            const {
                floor,
                flat,
                office,
                numberMeter,
                sumMeter,
                numberAsr,
                numberKdl,
                typeMeter,
                section,
                comment,
            } = req.body;

            // Тепере получаем устройство по id
            const device = await Models.MainAddMeter.findOne({
                where: {
                    id,
                },
            });
            // Добавляем новые данные к этому устройству
            await device.update({
                section,
                floor,
                flat,
                office,
                numberMeter,
                sumMeter,
                numberKdl,
                numberAsr,
                comment,
            });

            return res.json(device);
        } catch (e) {
            console.log(e);
        }
    }

    async getExcelTest(req, res) {
        const { objectId } = req.query;
        // Устанавливаем id объекта
        const listMeters = new TestExcelService(1);
        // Задаём имя excel файлу
        listMeters.setFileName("Счётчики_1111.xlsx");
        // Добавляем путь файла
        listMeters.setPathWithFileName();
        // Создаём excel файл
        await listMeters.getExcelWaterMeter();

        return res.download(listMeters.getPathWithFileName, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }

    async getExcelAllWaterMeterInObject(req, res) {
        try {
            // Получаем все счётчики электроэнергии в excel
            // Достаём id объекта
            const { objectBuildId } = req.query;
            const typeMeterCool = "Счётчик холодной воды";
            const typeMeterHot = "Счётчик горячей воды";
            const meters = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                    [Op.or]: [
                        { typeMeter: typeMeterCool },
                        { typeMeter: typeMeterHot },
                    ],
                },
                attributes: [
                    "id",
                    "section",
                    "floor",
                    "flat",
                    "numberKdl",
                    "numberAsr",
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
            worksheet["E1"] = { t: "s", v: "Номер КДЛ" };
            worksheet["F1"] = { t: "s", v: "Номер Канала" };
            worksheet["G1"] = { t: "s", v: "Номер счётчика" };
            worksheet["H1"] = { t: "s", v: "Показания" };
            worksheet["I1"] = { t: "s", v: "Тип счётчика" };
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Счётчики воды");
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
            console.log(objectBuildId, userId);
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
                                    numberKdl: d.numberKdl,
                                    numberAsr: d.numberAsr,
                                    numberMeter: d.numberMeter,
                                    sumMeter: d.sumMeter,
                                    objectBuildId,
                                    userId,
                                    typeMeter:
                                        d.numberAsr % 2 === 0
                                            ? "Счётчик горячей воды"
                                            : "Счётчик холодной воды",
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

    async searchByNumber(req, res) {
        try {
            const { numberFlat, objectId, limit, page } = req.query;

            const listFlats = await getMetersByNumberFlat(
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
                },
            });

            return res.json({ meter });
        } catch (e) {
            console.log(e);
        }
    }

    async getWaterTemplate(req, res) {
        try {
            const {
                objectBuildId,
                section,
                numberKdl,
                multiplier: multiplierN,
            } = req.query;

            const heatMeter = "Счётчик горячей воды";
            const coolMeter = "Счётчик холодной воды";

            const meters = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                    section,
                    numberKdl,
                },
                attributes: [
                    "id",
                    "section",
                    "floor",
                    "flat",
                    "numberKdl",
                    "numberAsr",
                    "numberMeter",
                    "sumMeter",
                    "typeMeter",
                ],
                order: [["flat", "DESC"]],
                raw: true,
            });

            // Получаем максимальное значение квартиры
            const maxFlat = meters.reduce((prev, curr) => {
                return prev.flat > curr.flat ? prev : curr;
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
            const nameSheet = "Счётчики воды";

            const arrInterface = [
                "",
                "[RS-485] Болид",
                "ID=",
                "ParentID=",
                "ClassName=TOrion_RS485_Interface",
                "Активность=Да",
                "Описание=[RS-485] Болид",
                "Тайм-аут чтения, мсек=3000",
                "Пауза между командами, мс=4",
                "Число неответов до потери=3",
                "Комментарий=",
            ];

            const arrBolidKdl = [
                "",
                "",
                "С2000-КДЛ",
                "ID=",
                "ParentID=",
                "ClassName=TKDLRegistrator",
                `Адрес прибора=${numberKdl}`,
                "Активность=Да",
                `Описание=С2000-КДЛ_${numberKdl}`,
                "Частота опроса, мин=0",
                `Комментарий=Секция №${section}`,
            ];

            const listMeters = [];
            meters.map((meter) => {
                let preparedDevice =
                    HeadersWaterConfig.getTBolid_HotWater_Counter(
                        meter,
                        maxFlat.flat,
                        multiplierN
                    );
                listMeters.push(preparedDevice);
            });

            const buffer = createWaterTemplate(
                listMeters,
                arrLink,
                arrInterface,
                arrBolidKdl,
                nameSheet
            );
            return res.send(buffer);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new TestWaterMeterController();
