import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $authHost } from "../../../http/index.js";

const initialState = {
    objectsBuild: [],
};

export const createObjects = createAsyncThunk(
    "api/object",
    async ({ formData }, { rejectedWithValue, dispatch }) => {
        const { data } = await $authHost.post("api/object", formData);
        dispatch(addObject(data));
    }
);

export const getAllObjects = createAsyncThunk(
    "api/object",
    async (_, { rejectedWithValue, dispatch }) => {
        const { data } = await $authHost.get("api/object");
        dispatch(setObject(data));
    }
);

export const objectSlice = createSlice({
    name: "objectsBuild",
    initialState,
    reducers: {
        addObject: (state, action) => {
            state.objectsBuild.push(action.payload);
        },

        setObject: (state, action) => {
            state.objectsBuild = action.payload;
        },

        removeObject: (state, action) => {
            state.objectsBuild = state.objectsBuild.filter(
                (obj) => obj.id !== action.payload
            );
        },
        extraReducers: {
            [getAllObjects.pending]: () => console.log("pending"),
            [getAllObjects.fulfilled]: () => console.log("fulfilled"),
            [getAllObjects.rejected]: () => console.log("rejected"),
        },
    },
});

export const { addObject, removeObject, setObject } = objectSlice.actions;
export const objectReducer = objectSlice.reducer;