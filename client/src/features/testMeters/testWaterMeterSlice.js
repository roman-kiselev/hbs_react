import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {$authHost} from "../../http/index.js";

const initialState = {
    mainTable: [],
    currentPage: 1,
    perPage: 10,
    totalCount: 0,
    lastMeters: [],
    limit: 2
}




export const createTestMeter = createAsyncThunk('api/testAddWater', async ({dataWith}, {rejectedWithValue, dispatch}) => {

    const {data} = await $authHost.post('api/testAddWater', dataWith)

    dispatch(setLastMeters({data}))

})

export const getAllMetersByUserAndObject = createAsyncThunk('api/testAddWater',async ({formQuery}, {rejectedWithValue, dispatch}) => {
    const {userId, objectId} = formQuery
    console.log(limit, currentPage)
    const {data} = await $authHost.get(`api/testAddWater?userId=${userId}&objectId=${objectId}&limit=${limit}&page=${currentPage}`)
    const {rows, count} = data.listMeters
    dispatch(setTotalCount(count))
    dispatch(setMeters({rows}))
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

            state.mainTable = action.payload.rows

        },

        setLastMeters: (state, action) => {
            state.lastMeters = action.payload
        },

        setTotalCount: (state, action) => {

            state.totalCount = action.payload
        },
        getTotalCount: (state, action) => {
            return state.totalCount
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }

    }
})


export const {addMeters, setMeters, setLastMeters, setTotalCount, setCurrentPage} = testWaterMeterSlice.actions;
export default testWaterMeterSlice.reducer;