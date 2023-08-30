import path from "path";
import XLSX from "xlsx";
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
import pkg from "sequelize";
import { MainAddMeter } from "../../models";
const { Op } = pkg;

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
    const workBook = XLSX.utils.book_new();

    const workSheetData = [workSheetColumnNames, ...data];

    const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
    XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
    XLSX.writeFile(workBook, path.resolve(filePath));
};

class ExcelService {
    public objectId: number;
    public pathExcel: string;
    public fileName: string;
    public pathWithFileName: string;
    constructor(objectId: number) {
        this.objectId = objectId;
        this.pathExcel = this.setPathExcel();
        this.fileName = "";
        this.pathWithFileName = "";
    }

    getLog() {
        // Путь до папки
        const pathExcel = path.join(__dirname, "../../static/objects/excel/");
        // Путь до файла с именем файла
        const filePath = path.join(pathExcel, "test.xlsx");

        const workbook = XLSX.readFile(filePath);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const lengthWorksheet = jsonData.length + 2; // 2 - это заголовок и первая строка оъекта
        console.log(lengthWorksheet);

        for (let i = 2; i < lengthWorksheet; i++) {
            const section = worksheet["A" + i].v;
            const floors = worksheet["B" + i].v;
            const flat = worksheet["C" + i].v;
            const kdl = worksheet["D" + i].v;

            console.log({
                section,
                floors,
                flat,
                kdl,
            });
        }
    }

    setPathExcel() {
        // Путь до папки
        const pathExcelSet = path.join(
            __dirname,
            "../../static/objects/excel/"
        );
        return pathExcelSet;
    }
    getPathExcel() {
        return this.pathExcel;
    }

    // Установим имя файла
    setFileName(fileName) {
        this.fileName = fileName;
    }
    // Возвращаем имя файла
    getFileName() {
        return this.fileName;
    }

    // Путь вместь с именем файла
    setPathWithFileName() {
        const fileNameSet = path.join(this.pathExcel, this.fileName);
        this.pathWithFileName = fileNameSet;
    }

    getPathWithFileName() {
        return this.pathWithFileName;
    }

    async getExcelWaterMeter() {
        let typeMeterCool = "Счётчик холодной воды";
        let typeMeterHot = "Счётчик горячей воды";

        try {
            const waterMeter = await MainAddMeter.findAll({
                where: {
                    objectBuildId: this.objectId,
                    [Op.or]: [
                        { typeMeter: typeMeterCool },
                        { typeMeter: typeMeterHot },
                    ],
                },
                order: [["id", "ASC"]],
            });

            // Заголовки для импорта
            const workSheetColumnNames = [
                "id",
                "Секция",
                "Этаж",
                "Квартира",
                "Тип счётчика",
                "Номер счётчика",
                "Показания",
                "№ Кдл",
                "№ Канала",
            ];

            // Имя листа
            const workSheetName = "Счётчики";

            // Экспорт excel
            const exportMetersToExcel = (
                meters,
                workSheetColumnNames,
                workSheetName,
                filePath
            ) => {
                const data = meters.map((meter) => {
                    return [
                        meter.id,
                        meter.section,
                        meter.floor,
                        meter.flat,
                        meter.typeMeter,
                        meter.numberMeter,
                        meter.sumMeter,
                        meter.numberKdl,
                        meter.numberAsr,
                    ];
                });

                exportExcel(
                    data,
                    workSheetColumnNames,
                    workSheetName,
                    filePath
                );
            };

            exportMetersToExcel(
                waterMeter,
                workSheetColumnNames,
                workSheetName,
                this.pathWithFileName
            );

            return true;
        } catch (e) {
            console.log(e);
        }
    }
}

export default ExcelService;
