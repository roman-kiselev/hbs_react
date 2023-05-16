import dbHeat from "../dbHeat";
// функция редактирования записи по id
async function editRecordById(id, newData) {
    try {
        const response = await dbHeat.main.update(id, newData);
        return response;
    } catch (err) {
        console.error(`Ошибка при обновлении записи с id ${id}: ${err}`);
    }
}

export default editRecordById;
