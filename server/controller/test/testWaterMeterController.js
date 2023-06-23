import chalk from "chalk";
import pkg, { Sequelize } from "sequelize";
import Models from "../../models/models.js";
import TestExcelService from "../../service/testExcel/TestExcelService.js";
import * as XLSX from "xlsx";
const { Op } = pkg;
import sequelize from "../../db.js";
import { getMetersByNumberFlat } from "../../service/serviceWater/serviceWater.js";
import HeadersWaterConfig from "../../service/headersConfig/headersWater/HeadersWaterConfig.js";
import createHeatTemplate from "../../service/headersConfig/createHeatTemplate.js";
import createWaterTemplate from "../../service/headersConfig/createWaterTemplate.js";
import { getDatFile } from "../../service/serviceWater/getDatFileWater.js";
import { getFlatString, changeArrMeter } from "../../helpers/index.js";

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

    async getExcelAllWaterMeterPulsarInObject(req, res) {
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

            // Получаем максимальное значение квартиры
            const maxFlat = meters.reduce((prev, curr) => {
                return prev.flat > curr.flat ? prev : curr;
            });

            // const x = [
            //     {
            //         id: 2129,
            //         section: 1,
            //         floor: 2,
            //         flat: 2,
            //         numberKdl: 1,
            //         numberAsr: 9,
            //         numberMeter: "65865",
            //         sumMeter: 2,
            //         typeMeter: "Счётчик холодной воды",
            //     },
            //     {
            //         id: 2130,
            //         section: 1,
            //         floor: 2,
            //         flat: 2,
            //         numberKdl: 1,
            //         numberAsr: 10,
            //         numberMeter: "135264",
            //         sumMeter: 2,
            //         typeMeter: "Счётчик горячей воды",
            //     },
            //     {
            //         id: 2127,
            //         section: 1,
            //         floor: 2,
            //         flat: 2,
            //         numberKdl: 1,
            //         numberAsr: 7,
            //         numberMeter: "6875233",
            //         sumMeter: 1,
            //         typeMeter: "Счётчик холодной воды",
            //     },
            //     {
            //         id: 2128,
            //         section: 1,
            //         floor: 2,
            //         flat: 2,
            //         numberKdl: 1,
            //         numberAsr: 8,
            //         numberMeter: "34858",
            //         sumMeter: 1,
            //         typeMeter: "Счётчик горячей воды",
            //     },
            //     {
            //         id: 2128,
            //         section: 1,
            //         floor: 2,
            //         flat: 1,
            //         numberKdl: 1,
            //         numberAsr: 8,
            //         numberMeter: "34858",
            //         sumMeter: 1,
            //         typeMeter: "Счётчик холодной воды",
            //     },
            //     {
            //         id: 2128,
            //         section: 1,
            //         floor: 2,
            //         flat: 1,
            //         numberKdl: 1,
            //         numberAsr: 8,
            //         numberMeter: "34858",
            //         sumMeter: 1,
            //         typeMeter: "Счётчик горячей воды",
            //     },
            //     {
            //         id: 2128,
            //         section: 1,
            //         floor: 2,
            //         flat: 1,
            //         numberKdl: 1,
            //         numberAsr: 8,
            //         numberMeter: "34858",
            //         sumMeter: 1,
            //         typeMeter: "Счётчик холодной воды",
            //     },
            //     {
            //         id: 2128,
            //         section: 1,
            //         floor: 2,
            //         flat: 1,
            //         numberKdl: 1,
            //         numberAsr: 8,
            //         numberMeter: "34858",
            //         sumMeter: 1,
            //         typeMeter: "Счётчик холодной воды",
            //     },
            // ];

            const editMeter = changeArrMeter(meters);

            // Преобразуем данные
            const newMeters = editMeter.map((meter) => {
                const {
                    id,
                    section,
                    floor,
                    flat,
                    numberKdl,
                    numberAsr,
                    numberMeter,
                    sumMeter,
                    typeMeter,
                    params,
                } = meter;

                return {
                    id,
                    section,
                    floor,
                    flat: getFlatString(flat, maxFlat.flat),
                    numberKdl,
                    numberAsr: `Канал${numberAsr}`,
                    numberMeter,
                    sumMeter,
                    typeMeter,
                    typePlace: "Квартира",
                    resourse:
                        typeMeter === "Счётчик холодной воды" ? "ХВС" : "ГВС",
                    paramResurs: params,
                    twoDevice: "Пульсар10-М",
                    description: `Квартира_${flat}`,
                };
            });

            const worksheet = XLSX.utils.json_to_sheet(newMeters);
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
            worksheet["J1"] = { t: "s", v: "Тип места" };
            worksheet["K1"] = { t: "s", v: "Ресурс" };
            worksheet["L1"] = { t: "s", v: "Параметр ресурса" };
            worksheet["M1"] = { t: "s", v: "Вторичный прибор" };
            worksheet["N1"] = { t: "s", v: "Доп описание" };
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
            const { objectBuildId, userId, checkSelected } = req.query;
            console.log(checkSelected);
            const { jsonData } = req.body;
            const data = JSON.parse(jsonData);
            console.log(data);
            // Создадим массив с повторяющимися счётчиками
            const repeatMeters = [];
            // Создаём транзакцию с помощью Sequelize

            if (checkSelected === "false") {
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
            } else {
                await sequelize.transaction(async (t) => {
                    try {
                        for (const d of data) {
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
                        }

                        return res.json({ success: true });
                    } catch (e) {
                        //await transaction.rollback();
                        console.log(e);
                    }
                });
            }

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

    // Получение dat текста
    async getDatText(req, res) {
        try {
            console.log("first");
            const { id: objectBuildId } = req.params;
            const { section, numberKdl } = req.query;

            const { time, channels } = await getDatFile(
                objectBuildId,
                section,
                numberKdl
            );

            return res.json({ time, channels });
        } catch (e) {
            console.log(e);
        }
    }

    // Получение всех счётчиков воды по объекту
    async getAllMetersInObject(req, res) {
        try {
            const { id: objectBuildId } = req.params;
            const meters = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                },
                include: { all: true },
                limit: 500,
            });

            return res.json({ meters });
        } catch (e) {
            console.log(e);
        }
    }

    // Синхронизация с таблицами статусов и логов
    // Для воды
    async synchronizationTable(req, res) {
        try {
            // Получаем id объекта
            const { id: objectBuildId } = req.params;
            // Получаем счётчики воды
            let typeMeterCool = "Счётчик холодной воды";
            let typeMeterHot = "Счётчик горячей воды";
            const meters = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                    [Op.or]: [
                        { typeMeter: typeMeterCool },
                        { typeMeter: typeMeterHot },
                    ],
                },
                raw: true,
            });

            for (const meter of meters) {
                const [meterStatus, created] =
                    await Models.ObjectBuildSettingUp.findOrCreate({
                        where: {
                            mainMeterId: meter.id,
                        },
                        defaults: {
                            status: "Работает",
                            replacement: false,
                            comment: false,
                            objectBuildId: meter.objectBuildId,
                        },
                    });
            }
        } catch (e) {
            console.log(e);
        }
    }

    // Отдадим таблицу с изменениями
    async getChangeTable(req, res) {
        try {
            const { id: objectBuildId } = req.params;
            const metersChange = await Models.ObjectBuildSettingUp.findAll({
                where: {
                    objectBuildId,
                },
                include: [Models.MainAddMeter, Models.MetersLogs],
            });

            return res.json({ metersChange });
        } catch (e) {
            console.log(e);
        }
    }

    async setObjectBuildSettingUp(req, res) {
        try {
            const { id } = req.params;
            const { status, replacement, comment } = req.body;
            const objectBuildSettingUp =
                await Models.ObjectBuildSettingUp.findByPk(id);
            await objectBuildSettingUp.update({
                status,
                replacement,
                comment,
            });

            return res.json({
                objectBuildSettingUp,
            });
        } catch (e) {
            console.log(e);
        }
    }

    // Обновление данных в базе данных
    async updateDataBase(req, res) {
        try {
            console.log("====>  update");
            const { jsonData } = req.body;
            console.log(jsonData);
            const data = JSON.parse(jsonData);
            console.log(data);

            for (const meter of data) {
                await Models.MainAddMeter.update(meter, {
                    where: {
                        id: meter.id,
                    },
                });
            }

            return res.json({ status: "true" });
        } catch (e) {
            console.error(e);
        }
    }

    // возвращаем таблицу для оффлайна
    async getTableForOffline(req, res) {
        try {
            const { id: objectBuildId } = req.params;
            console.log(objectBuildId);
            const table = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId,
                },
                attributes: [
                    "id",
                    "section",
                    "floor",
                    "flat",
                    "office",
                    "line",
                    "typeMeter",
                    "sumMeter",
                    "numberKdl",
                    "numberAsr",
                    "numberMeter",
                    "comment",
                ],
            });

            return res.json({ table });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new TestWaterMeterController();
