import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {$authHost} from "../../http/index.js";

const initialState = {
    mainTable: [],
    currentPage: 1,
    perPage: 10,
    totalCount: 0
}




export const createTestMeter = createAsyncThunk('api/testAddWater', async ({dataWith}, {rejectedWithValue, dispatch}) => {

    const {data} = await $authHost.post('api/testAddWater', dataWith)

    dispatch(addMeters(data))

})

export const getAllMetersByUserAndObject = createAsyncThunk('api/testAddWater',async ({formQuery}, {rejectedWithValue, dispatch}) => {
    const {userId, objectId} = formQuery
    const {data} = await $authHost.get(`api/testAddWater?userId=${userId}&objectId=${objectId}`, )

    dispatch(setMeters({data}))
})






export const testWaterMeterSlice = createSlice({
    name: "testWaterMeterSlice",
    initialState,
    reducers: {

        addMeters: (state, action) => {
            const {listMeters} = action.payload.data

            state.mainTable = [
                ...state.mainTable,
                ...listMeters
            ]
        },

        setMeters: (state, action) => {
            state.mainTable = action.payload.data.listMeters

        }

    }
})


export const {addMeters, setMeters} = testWaterMeterSlice.actions;
export default testWaterMeterSlice.reducer;