import db from "../db";

const addAllDataInDb = async (data) => {
    try {
        const result = await db.main.bulkAdd(data);
        if (result) {
            console.log(result);
        }
    } catch (e) {
        console.log(e);
    }
};

export { addAllDataInDb };
