import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $authHost } from "../../http";

const initialState = {
    listKdlInobject: [],
    listChannelInKdl: [],
};

// Получаем все кдл
export const getAllKdl = createAsyncThunk(
    "api/deviceGet",
    async ({ objectId }, { _, dispatch }) => {
        const { data } = await $authHost.get(
            `/api/deviceKdl/?objectBuildId=${objectId}`
        );
        return data;
    }
);

// Получаем каналы
export const getAllChannel = createAsyncThunk(
    "api/getAllChannel",
    async ({ objectId, numberKdl }) => {
        const { data } = await $authHost.get(
            `/api/deviceKdl/getChannel/?objectBuildId=${objectId}&numberKdl=${numberKdl}`
        );
        return data;
    }
);

export const deviceSlice = createSlice({
    name: "deviceSlice",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllKdl.pending]: (state, action) => {
            console.log(action);
        },
        [getAllKdl.fulfilled]: (state, action) => {
            state.listKdlInobject = action.payload;
        },
        [getAllKdl.rejected]: () => console.log("rejected"),
        [getAllChannel.fulfilled]: (state, action) => {
            state.listChannelInKdl = action.payload.allChannel;
        },
    },
});

export default deviceSlice.reducer;
