import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../http/index.js";

const initialState = {
    mainTable: [],
    currentPage: 1,
    perPage: 10,
    totalCount: 0,
    lastMeters: [],
    limit: 6,
};

export const createTestMeter = createAsyncThunk(
    "api/testAddWater",
    async ({ dataWith }, { rejectedWithValue, dispatch }) => {
        const { data } = await $authHost.post("api/testAddWater", dataWith);

        dispatch(setLastMeters({ data }));
    }
);

export const getAllMetersByUserAndObject = createAsyncThunk(
    "api/testAddWater",
    async ({ formQuery }, { getState, dispatch }) => {
        const { userId, objectBuildId } = formQuery;
        // Получаем лимит и текущую страницу из геттера
        // Что бы получить state добавляем getState.mainTable
        const state = getState();
        const { limit, currentPage } = state.mainTable;

        const { data } = await $authHost.get(
            `api/testAddWater?userId=${userId}&objectId=${objectBuildId}&limit=${limit}&page=${currentPage}`
        );

        const { rows, count } = data.listMeters;

        dispatch(setTotalCount(count));

        dispatch(setMeters({ rows }));
    }
);

// Функция для получения одного счётчика и редактирования
// Принимает id счётчика и обновляет его в базе данных
export const getOneMeter = createAsyncThunk(
    "api/testAddWater/:id",
    async ({ formData }, { getState, dispatch }) => {
        const id = formData.get("id");
        const state = getState();
        const { data } = await $authHost.post(
            `api/testAddWater/${id}`,
            formData
        );
    }
);

// Поиск по номеру квартиры
export const getMetersByNumberFlat = createAsyncThunk(
    "api/testAddWater/getMetersByNumberFlat",
    async ({ formQuery }, { getState, dispatch }) => {
        const state = getState();

        const { limit, currentPage } = state.mainTable;
        const { userId, objectBuildId, num } = formQuery;
        const { data } = await $authHost.get(
            `api/testAddWater/search/?userId=${userId}&objectId=${objectBuildId}&limit=${limit}&page=${currentPage}&numberFlat=${num}`
        );

        const { rows, count } = data.listFlats;

        dispatch(setTotalCount(count));
        dispatch(setMeters({ rows }));
    }
);

export const testWaterMeterSlice = createSlice({
    name: "testWaterMeterSlice",
    initialState,
    reducers: {
        addMeters: (state, action) => {
            const { listMeters } = action.payload.data;

            state.mainTable = [...state.mainTable, ...listMeters];
        },

        setMeters: (state, action) => {
            state.mainTable = action.payload.rows;
        },

        setLastMeters: (state, action) => {
            state.lastMeters = action.payload;
        },

        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        getTotalCount: (state, action) => {
            return state.totalCount;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const {
    addMeters,
    setMeters,
    setLastMeters,
    setTotalCount,
    setCurrentPage,
    getLimitAndCurrentPage,
} = testWaterMeterSlice.actions;
export default testWaterMeterSlice.reducer;
