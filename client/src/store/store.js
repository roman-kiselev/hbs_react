import { configureStore } from "@reduxjs/toolkit";
import objectSlice from "../features/objectBuild/objectBuildSlice";
import coolWaterBildSlice from "../features/bolid/coolBolidSlice";
import userSlice from "../features/user/userSlice";
import sectionsSlice from "../features/objectBuild/sectionsSlice";
import testWaterMeterSlice from "../features/testMeters/testWaterMeterSlice";
import leftMenuSlice from "../features/leftMenu/leftMenuSlice";
import testHeatMeterSlice from "../features/testMeters/testHeatMeterSlice";
import testElectricalMeterSlice from "../features/testMeters/testElectricalMeterSlice";

export const store = configureStore({
    reducer: {
        users: userSlice,
        objectBuilds: objectSlice,
        coolBolid: coolWaterBildSlice,
        sections: sectionsSlice,
        mainTable: testWaterMeterSlice,
        leftMenu: leftMenuSlice,
        heatMeter: testHeatMeterSlice,
        electricalMeter: testElectricalMeterSlice,
    },
});
