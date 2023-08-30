import * as XLSX from "xlsx";

export default (arrData, arrInterface, arrLink, nameSheet) => {
    // Могут быть приняты ещё массивы с заголовками
    // Создаём новую книгу

    const data = arrData.map((d) => {
        return ["", ""].concat(Object.values(d));
    });
    const workbook = XLSX.utils.book_new();

    // Создаём новый массив для заполнения
    const workSheetData = [
        ["Дерево устройств"],
        arrLink,
        arrInterface,
        ...data,
    ];

    // Добавляем данные в книгу
    const worksSheet = XLSX.utils.aoa_to_sheet(workSheetData);

    XLSX.utils.book_append_sheet(workbook, worksSheet, nameSheet);

    const buffer = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
    });

    return buffer;
};
