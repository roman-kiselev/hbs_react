import { userSlice } from "./../../shared/models/users/userSlice";
import { useReducer } from "react";
import {
    combineReducers,
    configureStore,
    Reducer,
    ThunkAction,
} from "@reduxjs/toolkit";
import { AppState } from "../../shared/interfaces/store";
import { useDispatch } from "react-redux";
import { api } from "../../shared/api/main";

const rootReducer = combineReducers({
    useReducer,
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
// export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
//     users: userSlice.reducer,
// });

// export const store = configureStore({
//     reducer: rootReducer,
// });
