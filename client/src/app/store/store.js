import { configureStore } from "@reduxjs/toolkit";
import {
    coolWaterBildReducer,
    deviceReducer,
    formHouseReducer,
    leftMenuAdminReducer,
    objectReducer,
    sectionsReducer,
    testElectricalMeterReducer,
    testHeatMeterReducer,
    testWaterMeterReducer,
    userReducer,
} from "../../shared/models";

export const store = configureStore({
    reducer: {
        users: userReducer,
        objectBuilds: objectReducer,
        coolBolid: coolWaterBildReducer,
        sections: sectionsReducer,
        mainTable: testWaterMeterReducer,
        leftMenu: leftMenuAdminReducer,
        heatMeter: testHeatMeterReducer,
        electricalMeter: testElectricalMeterReducer,
        formHouse: formHouseReducer,
        device: deviceReducer,
    },
});
