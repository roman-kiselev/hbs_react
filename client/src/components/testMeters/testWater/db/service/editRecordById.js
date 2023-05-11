import db from "../db";

// функция редактирования записи по id
async function editRecordById(id, newData) {
    try {
        const response = await db.main.update(id, newData);

        console.log(`Запись с id ${id} была успешно обновлена`);
        return response;
    } catch (err) {
        console.error(`Ошибка при обновлении записи с id ${id}: ${err}`);
    }
}

export default editRecordById;
