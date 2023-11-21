import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $authHost } from "../../../http/index.js";

const initialState = {
    sections: [],
    count: null,
    page: 1,
    limit: 3,
};

export const createSections = createAsyncThunk(
    "api/sections",
    async ({ formData }, { rejectedWithValue, dispatch }) => {
        const { data } = await $authHost.post("api/sections", formData);
        dispatch(addSections(data));
    }
);

export const getAllSections = createAsyncThunk(
    "api/sections",
    async ({ dataForFilter }, { rejectedWithValue, dispatch }) => {
        console.log(data);
        const { data } = await $authHost.get("api/sections", {
            params: {
                dataForFilter,
            },
        });
        dispatch(setSections(data));
    }
);

export const sectionsSlice = createSlice({
    name: "sectionsSlice",
    initialState,
    reducers: {
        addSections: (state, action) => {
            state.sections.push(action.payload);
        },

        setSections: (state, action) => {
            const { count, rows } = action.payload.sections;
            state.sections = rows;
            state.count = count;
        },

        removeSections: (state, action) => {},
    },
});

export const { addSections, setSections, removeSections } =
    sectionsSlice.actions;
export const sectionsReducer = sectionsSlice.reducer;
