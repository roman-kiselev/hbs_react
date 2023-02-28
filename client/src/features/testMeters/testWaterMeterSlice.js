import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {$authHost, $host} from "../../http/index.js";

const initialState = {
    mainTable: []
}












export const testWaterMeterSlice = createSlice({
    name: "testWaterMeterSlice",
    initialState,
    reducers: {

        addMeters: (state, action) => {
            state.mainTable = [
                ...state.mainTable,
                {
                    ...action.payload
                }
            ]
        }

    }
})