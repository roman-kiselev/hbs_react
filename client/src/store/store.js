import { configureStore } from "@reduxjs/toolkit";
import coolWaterBildSlice from "../features/bolid/coolBolidSlice";
import deviceSlice from "../features/devices/DeviceSlice";
import formHouseSlice from "../features/formHouse/formHouseSlice";
import leftMenuSlice from "../features/leftMenu/leftMenuSlice";
import objectSlice from "../features/objectBuild/objectBuildSlice";
import sectionsSlice from "../features/objectBuild/sectionsSlice";
import testElectricalMeterSlice from "../features/testMeters/testElectricalMeterSlice";
import testHeatMeterSlice from "../features/testMeters/testHeatMeterSlice";
import testWaterMeterSlice from "../features/testMeters/testWaterMeterSlice";
import userSlice from "../features/user/userSlice";

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
        formHouse: formHouseSlice,
        device: deviceSlice,
    },
});
