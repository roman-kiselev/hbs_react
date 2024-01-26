import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { mainApi } from "../../shared/api/main";
import {
    coolWaterBildReducer,
    deskAutoReducer,
    deskReducer,
    deviceReducer,
    formHouseReducer,
    leftMenuAdminReducer,
    objectReducer,
    sectionsReducer,
    testElectricalMeterReducer,
    testHeatMeterReducer,
    testWaterMeterReducer,
    userReducer,
    waterReducer,
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
        water: waterReducer,
        desk: deskReducer,
        deskAuto: deskAutoReducer,
        [mainApi.reducerPath]: mainApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mainApi.middleware),
});

setupListeners(store.dispatch);
