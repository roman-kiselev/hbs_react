import * as XLSX from "xlsx";

export default (arrData) => {
    // Могут быть приняты ещё массивы с заголовками
    // Создаём новую книгу
    const workbook = XLSX.utils.book_new();
    let waterTwoString = [
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
    // Создаём новый массив для заполнения
    const workSheetData = [waterTwoString, ...arrData];
    // Добавляем данные в книгу
    const worksSheet = XLSX.utils.json_to_sheet(workSheetData);

    XLSX.utils.book_append_sheet(workbook, worksSheet, "Счётчики тепла");

    const buffer = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
    });

    return buffer;
    // if (!headersInterface) {

    // } else {
    //     // // Создаём новую книгу
    //     // const workbook = XLSX.utils.book_new();
    //     // // Создаём новый массив для заполнения
    //     // const workSheetData = [
    //     //     ...headersInterface,
    //     //     ...headersTemplate,
    //     //     ...arrData,
    //     // ];
    //     // // Добавляем данные в книгу
    //     // XLSX.utils.book_append_sheet(workbook, workSheetData, "Счётчики тепла");
    //     // const buffer = XLSX.write(workbook, {
    //     //     type: "buffer",
    //     //     bookType: "xlsx",
    //     // });
    //     // return buffer;
    // }
};
