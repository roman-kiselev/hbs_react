import {
    addMeters,
    createTestMeter,
    getAllMetersByUserAndObject,
    getLimitAndCurrentPage,
    getMetersByNumberFlat,
    getOneMeter,
    setCurrentPage,
    setLastMeters,
    setMeters,
    setTotalCount,
    testWaterMeterReducer,
    testWaterMeterSlice,
} from "./testWaterMeterSlice";

export {
    addMeters as addWaterMeters,
    createTestMeter as createTestWaterMeter,
    getAllMetersByUserAndObject as getAllWaterMetersByUserAndObject,
    getOneMeter as getOneWaterMeter,
    getLimitAndCurrentPage as getWaterLimitAndCurrentPage,
    getMetersByNumberFlat as getWaterMetersByNumberFlat,
    setCurrentPage as setCurrentWaterPage,
    setLastMeters as setLastWaterMeters,
    setTotalCount as setTotalWaterCount,
    setMeters as setWaterMeters,
    testWaterMeterReducer,
    testWaterMeterSlice,
};
