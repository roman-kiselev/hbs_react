import {
    combineReducers,
    configureStore,
    Reducer,
    ThunkAction,
} from "@reduxjs/toolkit";
import { userReducer } from "../../shared/models";
import { useDispatch } from "react-redux";
import { api } from "../../shared/api/main";

const rootReducer = combineReducers({
    user: userReducer,
    [api.reducerPath]: api.reducer,
});
const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(api.middleware);
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
