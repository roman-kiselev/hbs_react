import dbHeat from "../dbHeat";

const getAllTable = async () => {
    try {
        const data = await dbHeat.main.toArray();

        return data;
    } catch (e) {
        console.log(e);
    }
};

export default getAllTable;
