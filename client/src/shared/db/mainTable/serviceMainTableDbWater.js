import mainTableDb from "./mainTableDb";
const getCoolOrHot = (record) => {
    const {
        section,
        floors: floor,
        flat,
        office,
        kdl: numberKdl,
        channelCool,
        channelHot,
        numberMeterCool,
        numberMeterHot,
        sumMeterCool,
        sumMeterHot,
        userId,
        objectBuildId,
    } = record;

    return {
        coolWater: {
            section,
            floor,
            flat,
            office,
            typeMeter: "Счётчик холодной воды",
            numberAsr: channelCool,
            numberMeter: numberMeterCool,
            sumMeter: sumMeterCool,
            numberKdl,
            objectBuildId,
            userId,
            idMain: null,
            line: null,
            comment: null,
            isDevice: true,
            state: "loading",
        },
        hotWater: {
            section,
            floor,
            flat,
            office,
            typeMeter: "Счётчик горячей воды",
            numberAsr: channelHot,
            numberMeter: numberMeterHot,
            sumMeter: sumMeterHot,
            numberKdl,
            objectBuildId,
            userId,
            idMain: null,
            line: null,
            comment: null,
            isDevice: true,
            state: "loading",
        },
    };
};

export const createWaterMeter = async (record) => {
    try {
        const id = await mainTableDb.mainTable.add(record);
        return id;
    } catch (error) {
        console.error("Error creating record:", error);
    }
};

export const createWaterBulkMeter = async (record) => {
    try {
        const waterCool = getCoolOrHot(record).coolWater;
        const waterHot = getCoolOrHot(record).hotWater;
        const meters = [waterCool, waterHot];
        const arr = await mainTableDb.mainTable.bulkAdd(meters);
        return arr;
    } catch (error) {
        console.error("Error creating record:", error);
    }
};

export const updateWater = async (id, updatedData) => {
    try {
        await mainTableDb.mainTable.update(id, updatedData);
    } catch (error) {
        console.error("Error updating record:", error);
    }
};

export const deleteWater = async (id) => {
    try {
        await mainTableDb.mainTable.delete(id);
    } catch (error) {
        console.error("Error deleting record:", error);
    }
};

export const findWaterById = async (id) => {
    try {
        const record = await mainTableDb.mainTable.get(id);
        return record;
    } catch (error) {
        console.error("Error finding record by id:", error);
    }
};

export const findAllWater = async () => {
    try {
        const records = await mainTableDb.mainTable.toArray();
        return records;
    } catch (error) {
        console.error("Error finding all records:", error);
    }
};

export const findWaterByWhere = async (condition) => {
    try {
        const records = await mainTableDb.mainTable.where(condition).toArray();
        return records;
    } catch (error) {
        console.error("Error finding records by condition:", error);
    }
};
