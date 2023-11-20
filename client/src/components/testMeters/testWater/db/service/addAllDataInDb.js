import db from "../db";

const addAllDataInDb = async (data) => {
    try {
        db.open().then(async () => {
            const result = await db.main.bulkAdd(data);
        });
    } catch (e) {
        console.log(e);
    }
};

export { addAllDataInDb };
