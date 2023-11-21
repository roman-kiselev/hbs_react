import {
    addMeters,
    createTestHeatMeter,
    getAllHeatMeter,
    getMetersByNumberFlat,
    getOneHeatMeter,
    setCurrentPage,
    setLastMeters,
    setMeters,
    setTotalCount,
    testHeatMeterReducer,
    testHeatMeterSlice,
} from "./testHeatMeterSlice";

export {
    addMeters as addHeatMeters,
    createTestHeatMeter,
    getAllHeatMeter,
    getMetersByNumberFlat as getHeatMetersByNumberFlat,
    getOneHeatMeter,
    setCurrentPage as setCurrentHeatPage,
    setMeters as setHeatMeters,
    setLastMeters as setLastHeatMeters,
    setTotalCount as setTotalHeatCount,
    testHeatMeterReducer,
    testHeatMeterSlice,
};
