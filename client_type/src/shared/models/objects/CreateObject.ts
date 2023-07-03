import { createSlice } from "@reduxjs/toolkit";
import { ICreateObjectSlice } from "../../interfaces";

const initialState: ICreateObjectSlice = {
    name: "",
    description: "",
    img: null,
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
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setImg: (state, action) => {
            state.img = action.payload;
        },
    },
});

export const { setName, setDescription, setImg } = createObjectSlice.actions;
export const createObjectReducer = createObjectSlice.reducer;
