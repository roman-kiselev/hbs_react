import {configureStore} from "@reduxjs/toolkit";
import objectSlice from "../features/objectBuild/objectBuildSlice";
import coolWaterBildSlice from "../features/bolid/coolBolidSlice";
import userSlice from "../features/user/userSlice";


export const store = configureStore({
    reducer: {
        users: userSlice,
        objectBuilds: objectSlice,
        coolBolid: coolWaterBildSlice
    }
})