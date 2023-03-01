import {configureStore} from "@reduxjs/toolkit";
import objectSlice from "../features/objectBuild/objectBuildSlice";
import coolWaterBildSlice from "../features/bolid/coolBolidSlice";
import userSlice from "../features/user/userSlice";
import sectionsSlice from "../features/objectBuild/sectionsSlice";
import testWaterMeterSlice from "../features/testMeters/testWaterMeterSlice";


export const store = configureStore({
    reducer: {
        users: userSlice,
        objectBuilds: objectSlice,
        coolBolid: coolWaterBildSlice,
        sections: sectionsSlice,
        mainTable: testWaterMeterSlice
    }
})