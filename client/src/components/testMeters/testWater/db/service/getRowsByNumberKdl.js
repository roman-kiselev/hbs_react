import db from "../db";

async function getRowsByNumberKdl(numberKdl) {
    const rows = await db.main.where("numberKdl").equals(numberKdl).toArray();
    return rows;
}

export default getRowsByNumberKdl;
