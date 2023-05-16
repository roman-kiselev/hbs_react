import dbHeat from "../dbHeat";

const addAllDataInDb = async (data) => {
    try {
        dbHeat.open().then(async () => {
            const result = await dbHeat.main.bulkAdd(data);
        });
    } catch (e) {
        console.log(e);
    }
};

export { addAllDataInDb };
