import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
};

export const leftMenuAdminSlice = createSlice({
    name: "leftMenuAdmin",
    initialState,
    reducers: {
        setShow: (state, action) => {
            state.show = action.payload;
        },
    },
});

export const { setShow } = leftMenuAdminSlice.actions;
export const leftMenuAdminReducer = leftMenuAdminSlice.reducer;
