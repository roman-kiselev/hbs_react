import { createSlice } from "@reduxjs/toolkit";
import { objectsApi } from "../../api";
import { IObjectSlice } from "../../interfaces";
import GetAllObjects from "./GetAllObjects";

const initialState: IObjectSlice = {
    objects: [],
    isLoading: false,
    isError: false,
    dataError: null,
};

export const objectSlice = createSlice({
    name: "objects",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            objectsApi.endpoints.getAllObjects.matchPending,
            GetAllObjects.pending
        );

        builder.addMatcher(
            objectsApi.endpoints.getAllObjects.matchFulfilled,
            GetAllObjects.fulfilled
        );

        builder.addMatcher(
            objectsApi.endpoints.getAllObjects.matchRejected,
            GetAllObjects.rejected
        );
    },
});

export const objectReducer = objectSlice.reducer;
