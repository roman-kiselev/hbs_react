import db from "../db";

const getAllTable = async () => {
    try {
        const data = await db.main.toArray();
        //console.log(data);
        return data;
    } catch (e) {
        console.log(e);
    }
};

export default getAllTable;
