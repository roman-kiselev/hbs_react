import {
    combineReducers,
    configureStore,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { leftMenuReducer } from "../../features/leftMenu/leftMenuSlice";
import { objectsBuildReducer } from "../../features/objectBuild/objectBuildSlice";
import { testElectricalMeterReducer } from "../../features/testMeters/testElectricalMeterSlice";
import { testHeatMeterReducer } from "../../features/testMeters/testHeatMeterSlice";
import { testWaterMeterReducer } from "../../features/testMeters/testWaterMeterSlice";
import { api, authApi, objectsMainApi } from "../../shared/api";
import { objectReducer, userReducer } from "../../shared/models";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: (action, listenerApi) => {
        listenerApi.cancelActiveListeners();
        if (action.payload.token) {
            localStorage.setItem("token", action.payload.token);
        }
    },
});

const rootReducer = combineReducers({
    user: userReducer,
    objects: objectReducer,
    objectBuilds: objectsBuildReducer,
    mainTable: testWaterMeterReducer,
    leftMenu: leftMenuReducer,
    heatMeter: testHeatMeterReducer,
    electricalMeter: testElectricalMeterReducer,

    [objectsMainApi.reducerPath]: objectsMainApi.reducer,
    [api.reducerPath]: api.reducer,
});
const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware()
            .concat(api.middleware, objectsMainApi.middleware)
            .prepend(listenerMiddleware.middleware);
    },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
