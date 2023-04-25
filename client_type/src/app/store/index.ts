import { userSlice } from "./../../shared/models/users/userSlice";
import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { AppState } from "../../shared/interfaces/store";

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    users: userSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
