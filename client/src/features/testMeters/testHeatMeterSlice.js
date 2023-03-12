import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {$authHost} from "../../http/index.js";

const initialState = {
    mainTable: [],
    currentPage: 1,
    perPage: 10,
    totalCount: 0,
    lastMeters: {},
    limit: 6
}



export const createTestHeatMeter = createAsyncThunk('api/testAddHeat', async ({dataMeter}, {rejectedWithValue, dispatch}) => {
    const {data} = await $authHost.post('api/testAddHeat', dataMeter)
    dispatch(setLastMeters(dataMeter))

})


export const getAllHeatMeter = createAsyncThunk('api/testAddHeat', async ({formQuery}, {getState, dispatch}) => {
    const {userId, objectId} = formQuery
    // Получаем лимит и текущую страницу из геттера
    // Что бы получить state добавляем getState.mainTable
    const state = getState()
    const {limit, currentPage} = state.mainTable

    const {data} = await $authHost.get(`api/testAddHeat?userId=${userId}&objectId=${objectId}&limit=${limit}&page=${currentPage}`)

    const {rows, count} = data.listMeters
    dispatch(setTotalCount(count))
    dispatch(setMeters(rows))
})


export const testHeatMeterSlice = createSlice({
    name: 'testHeatMeterSlice',
    initialState,
    reducers: {
        setLastMeters: (state, action) => {
            state.lastMeters = action.payload
        },

        addMeters: (state, action) => {
            
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload
        },
        setMeters: (state, action) => {

            state.mainTable = action.payload.rows

        },
    }


})


export const {setLastMeters, setTotalCount, setMeters, addMeters} = testHeatMeterSlice.actions
export default testHeatMeterSlice.reducer;