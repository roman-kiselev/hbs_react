import db from "../db";

async function getRowsByNumberKdl(numberKdl) {
    const rows = await db.main
        .where("numberKdl")
        .equals(numberKdl)
        .sortBy("numberAsr");

    return rows;
}

export default getRowsByNumberKdl;
