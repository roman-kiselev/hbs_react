import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listMeters: [],
};

export const waterSlice = createSlice({
    initialState,
    name: "water",
    reducers: {},
    extraReducers: {},
});

export const {} = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
