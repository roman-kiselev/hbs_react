import * as XLSX from "xlsx";

export default (arrData) => {
    console.log(arrData);
    // Создаём новую книгу
    const workbook = XLSX.utils.book_new();
    // Создаём новый массив для заполнения
    const workSheetData = [...arrData];
    // Добавляем данные в книгу
    const worksSheet = XLSX.utils.json_to_sheet(arrData);

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
