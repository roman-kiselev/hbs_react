import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../http/index.js";

const initialState = {
    mainTable: [],
    currentPage: 1,
    perPage: 10,
    totalCount: 0,
    lastMeters: {},
    limit: 6,
};

export const createTestHeatMeter = createAsyncThunk(
    "api/testAddHeat",
    async ({ dataMeter }, { rejectedWithValue, dispatch }) => {
        const { data } = await $authHost.post("api/testAddHeat", dataMeter);
        dispatch(setLastMeters(dataMeter));
    }
);

export const getAllHeatMeter = createAsyncThunk(
    "api/testAddHeat",
    async ({ formQuery }, { getState, dispatch }) => {
        const { userId, objectBuildId, currentPage } = formQuery;
        // Получаем лимит и текущую страницу из геттера
        // Что бы получить state добавляем getState.mainTable
        const state = getState();
        const { limit } = state.mainTable;

        const { data } = await $authHost.get(
            `api/testAddHeat?userId=${userId}&objectId=${objectBuildId}&limit=${limit}&page=${currentPage}`
        );

        const { rows, count } = data.heatMeters;
        dispatch(setTotalCount(count));

        dispatch(setMeters({ rows }));
    }
);

export const testHeatMeterSlice = createSlice({
    name: "testHeatMeterSlice",
    initialState,
    reducers: {
        setLastMeters: (state, action) => {
            state.lastMeters = action.payload;
        },

        addMeters: (state, action) => {},
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        getTotalCount: (state, action) => {
            return state.totalCount;
        },
        setMeters: (state, action) => {
            state.mainTable = action.payload.rows;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
            console.log(action.payload);
        },
    },
});

export const {
    setLastMeters,
    setTotalCount,
    setMeters,
    addMeters,
    setCurrentPage,
} = testHeatMeterSlice.actions;
export default testHeatMeterSlice.reducer;
