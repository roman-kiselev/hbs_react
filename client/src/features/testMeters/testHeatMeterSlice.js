import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {$authHost} from "../../http/index.js";

const initialState = {
    mainTable: [],
    currentPage: 1,
    perPage: 10,
    totalCount: 0,
    lastMeters: [],
    limit: 6
}



export const createTestHeatMeter = createAsyncThunk('api/testAddHeat', async (_, {rejectedWithValue, dispatch}) => {
    const {data} = await $authHost.post('api/testAddHeat')

})



export const testHeatMeterSlice = createSlice({
    name: 'testHeatMeterSlice',
    initialState,
    reducers: {
        setLastMeters: (state, action) => {
            state.lastMeters = action.payload
        }
    }
})


export const {setLastMeters} = testHeatMeterSlice.actions
export default testHeatMeterSlice.reducer;