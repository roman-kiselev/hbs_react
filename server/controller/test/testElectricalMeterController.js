import Models from "../../models/models.js";
import XLSX from "xlsx";
import sequelize from "../../db.js";

class TestElectricalMeterController {
    async createMeter(req, res) {
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

            const newMeter = await Models.MainAddMeter.create({
                section,
                floor,
                flat,
                line,
                typeMeter: "Счётчик электроэнергии",
                numberMeter,
                sumMeter,
                objectBuildId,
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
            console.log(limit, page, offset);
            let typeMeter = "Счётчик электроэнергии";

            const meters = await Models.MainAddMeter.findAndCountAll({
                where: {
                    objectBuildId,
                    userId,
                    typeMeter,
                },
                limit,
                offset,
                order: [["createdAt", "DESC"]],
            });
            console.log("Я вып");
            return res.json({ meters });
        } catch (e) {
            console.log(e);
        }
    }

    async editMeterById(req, res) {
        try {
            const { id } = req.params;
            const { floor, flat, line, section, numberMeter, sumMeter } =
                req.body;

            const meter = await Models.MainAddMeter.findByPk(id);
            console.log(meter);
            // Проверить что все поля не равны нулю
            if (floor !== 0 && flat !== 0 && line !== 0 && section !== 0) {
                await meter.update({
                    floor,
                    flat,
                    line,
                    section,
                    numberMeter,
                    sumMeter,
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
}

export default new TestElectricalMeterController();
