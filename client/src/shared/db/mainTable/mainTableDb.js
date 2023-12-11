import Dexie from "dexie";

export const mainTableDb = new Dexie("mainTable");
mainTableDb.version(1).stores({
    mainTable:
        "++id, idMain, objectBuildId, section, floor, flat, office, line, typeMeter, numberMeter, sumMeter, numberKdl, numberAsr, comment, isDevice, state",
});

export default mainTableDb;
