import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
};

export const leftMenuSlice = createSlice({
    name: "leftMenu",
    initialState,
    reducers: {
        setShow: (state, action) => {
            state.show = action.payload;
        },
    },
});

export const { setShow } = leftMenuSlice.actions;
export const leftMenuReducer = leftMenuSlice.reducer;
export default leftMenuSlice.reducer;
