import {configureStore} from "@reduxjs/toolkit";
import objectSlice from "../features/objectBuild/objectBuildSlice";

export const store = configureStore({
    reducer: {
        objectBuilds: objectSlice
    }
})