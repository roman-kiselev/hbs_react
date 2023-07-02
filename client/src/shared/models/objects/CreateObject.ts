import { createSlice } from "@reduxjs/toolkit";
import { ICreateObjectSlice } from "../../interfaces";

const initialState: ICreateObjectSlice = {
    name: "",
    address: "",
    listObjects: null,
    isLoading: false,
    isError: false,
    dataError: null,
};

const createObjectSlice = createSlice({
    name: "createObject",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
    },
});

export const { setName, setAddress } = createObjectSlice.actions;
export const createObjectReducer = createObjectSlice.reducer;
