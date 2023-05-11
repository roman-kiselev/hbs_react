import db from "../db";

const getUniqueKdl = async () => {
    try {
        const uniqueValue = await db.main.orderBy("numberKdl").uniqueKeys();

        return uniqueValue;
    } catch (e) {
        console.log(e);
    }
};

export default getUniqueKdl;
