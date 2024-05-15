// Контроллер для списка счётчиков тепла
import pkg, { Sequelize } from "sequelize";
import XLSX from "xlsx";
import sequelize from "../../db.js";
import Models from "../../models/models.js";
import createHeatTemplate from "../../service/headersConfig/createHeatTemplate.js";
import HeadersHeatConfig from "../../service/headersConfig/headersHeat/HeadersHeatConfig.js";
import { getHeatMetersByNumberFlat } from "../../service/serviceHeat/serviceHeat.js";
const { Op } = pkg;

class TestHeatMeterController {
    // Создадим счётчик тепла
    async addNewMeter(req, res) {
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

            const heatMeter = await Models.MainAddMeter.create({
                section: section,
                floor: floor,
                flat: flat ? flat : 0,
                office: office ? office : 0,
                typeMeter: "Счётчик тепла",
                line: line,
                numberMeter: numberMeter,
                sumMeter: sumMeter,
                objectBuildId,
                comment,
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
                    //userId: userId,
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

            const {
                floor,
                flat,
                office,
                section,
                line,
                numberMeter,
                sumMeter,
                comment,
            } = req.body;

            const heatMeter = await Models.MainAddMeter.findByPk(id);

            await heatMeter.update({
                floor,
                flat,
                office: heatMeter.office === null ? 0 : heatMeter.office,
                section,
                line,
                numberMeter,
                sumMeter,
                comment,
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
            //Создаём данные для прогрессбара
            const dataLength = data.length;
            let loadedData = 0;
            let progressBar = Math.round((loadedData / dataLength) * 100);

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
                                    // userId,
                                    typeMeter: "Счётчик тепла",
                                },
                                { transaction: t }
                            );
                            loadedData++;
                        } else {
                            repeatMeters.push(meter);
                            loadedData++;
                        }
                    }

                    return res.json({
                        repeatMeters,
                        success: true,
                        progress: progressBar,
                    });
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
                    typeMeter: "Счётчик тепла",
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

    async getTemplateHeat(req, res) {
        try {
            // Получаем с фронтенда данные для заполнения шаблона
            // Заголовки берём из serviceHeaders
            // Там функция принимает на вход квартиру, номер счётчика, секцию, этаж, данные из query
            const { objectBuildId, line, template } = req.query;

            const meters = await sequelize.query(
                `
                SELECT DISTINCT
                mm.numberMeter as numberMeter,
                mm.id as id,
                mm.section as section,
                mm.floor as floor,
                mm.flat as flat,
                mm.line as line,
                mm.sumMeter as sumMeter,
                mm.typeMeter as typeMeter
            FROM main_meters mm
            WHERE
                mm.objectBuildId = :objectBuildId
                AND mm.typeMeter = 'Счётчик тепла'
                AND mm.line = :line
            ORDER BY mm.floor DESC;
                `,
                {
                    type: sequelize.QueryTypes.SELECT,
                    replacements: {
                        objectBuildId: objectBuildId,
                        line: line,
                    },
                }
            );

            // Получаем максимальное значение квартиры
            const maxFlat = await Models.MainAddMeter.findOne({
                where: {
                    objectBuildId,
                    typeMeter: "Счётчик тепла",
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
            const nameSheet = "Счётчики тепла";

            switch (template) {
                case "MeterBus":
                    const listMeters = [];
                    meters.map(({ flat, numberMeter, section, floor }) => {
                        let preparedDevice =
                            HeadersHeatConfig.getTMBusUniversal_Heat_Counter(
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
                        "[MBus] Счётчики Meter-Bus",
                        "ID=",
                        "ParentID=",
                        "ClassName=TMBus_Interface",
                        "Активность=Нет",
                        "Скорость порта=2400",
                        "Описание=[MBus] Счётчики Meter-Bus",
                        "Таймаут, мсек=3000",
                        "Задержка между командами, мсек=400",
                        "Задержка между счётчиками, мсек=3000",
                        "Число неответов до потери=3",
                        "Совместимость с Карат-911=Нет",
                        "Контроль чётности=EVENPARITY",
                        "Отображать тревожные состояния=Да",
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

            const listFlats = await getHeatMetersByNumberFlat(
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
                    typeMeter: "Счётчик тепла",
                },
            });

            return res.json({ meter });
        } catch (e) {
            console.log(e);
        }
    }

    // Отдаём для оффлайн
    async getAllHeatMetersForOffline(req, res) {
        try {
            const { id } = req.params;
            const table = await Models.MainAddMeter.findAll({
                where: {
                    objectBuildId: id,
                    typeMeter: "Счётчик тепла",
                },
                attributes: [
                    ["id", "idDb"],
                    "section",
                    "floor",
                    "flat",
                    "office",
                    "line",
                    "typeMeter",
                    "numberMeter",
                    "sumMeter",
                    "comment",
                ],
            });

            return res.json({ table });
        } catch (e) {
            console.log(e);
        }
    }

    // Добавляем данные или обновляем
    async addOrUpdateMeter(req, res) {
        try {
            const { id } = req.params;
            const { dataJson } = req.body;
            // [
            //     {
            //       idDb: 1799,
            //       section: 1,
            //       floor: 2,
            //       flat: 3,
            //       office: 0,
            //       line: 6,
            //       typeMeter: 'Счётчик тепла',
            //       numberMeter: '1',
            //       sumMeter: 1.96,
            //       comment: null,
            //       id: 1
            //     },
            //     {
            //       section: '2',
            //       floor: '1',
            //       flat: '2',
            //       office: 0,
            //       numberMeter: '123',
            //       sumMeter: '1',
            //       line: '1',
            //       typeMeter: 'Счётчик тепла',
            //       comment: '',
            //       objectBuildId: '4',
            //       userId: 1,
            //       id: 2
            //     }
            //   ]
            const data = JSON.parse(dataJson);
            for (const meter of data) {
                // Если есть id из базы данных то обновляем
                if (meter.idDb) {
                    const {
                        section,
                        floor,
                        flat,
                        office,
                        line,
                        typeMeter,
                        numberMeter,
                        sumMeter,
                        comment,
                        objectBuildId,
                        userId,
                    } = meter;

                    await Models.MainAddMeter.update(
                        {
                            section,
                            floor,
                            flat,
                            office,
                            line,
                            typeMeter,
                            numberMeter,
                            sumMeter,
                            comment,
                            objectBuildId,
                            userId,
                        },
                        {
                            where: {
                                id: meter.idDb,
                            },
                        }
                    );
                } else {
                    const {
                        section,
                        floor,
                        flat,
                        office,
                        line,
                        typeMeter,
                        numberMeter,
                        sumMeter,
                        comment,
                        objectBuildId,
                        userId,
                    } = meter;
                    const [meterAdd, created] =
                        await Models.MainAddMeter.findOrCreate({
                            where: {
                                flat,
                                numberMeter,
                                objectBuildId,
                            },
                            defaults: {
                                section,
                                floor,
                                office,
                                line,
                                typeMeter,
                                sumMeter,
                                comment,
                                userId,
                            },
                        });
                    // await Models.MainAddMeter.create({
                    //     section,
                    //     floor,
                    //     flat,
                    //     office,
                    //     line,
                    //     typeMeter,
                    //     numberMeter,
                    //     sumMeter,
                    //     comment,
                    //     objectBuildId,
                    //     userId,
                    // });
                }
            }

            return res.json({ message: "Данные обновлены" });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new TestHeatMeterController();
