import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $authHost } from "../../../http/index.js";

/**
 * @typedef {object} MainTableState
 * @property {Array<object>} mainTable - Данные для основной таблицы.
 * @property {number} currentPage - Текущая страница.
 * @property {number} perPage - Количество элементов на странице.
 * @property {number} totalCount - Общее количество элементов.
 * @property {Array<object>} lastMeters - Последние показания счетчиков.
 * @property {number} limit - Лимит для количества последних показаний счетчиков.
 */

/**
 * @type {MainTableState}
 * @constant
 * @description Начальное состояние для данных основной таблицы.
 */
const initialState = {
    mainTable: [],
    currentPage: 1,
    perPage: 10,
    totalCount: 0,
    lastMeters: [],
    limit: 6,
};

/**
 * @typedef {object} CreateTestMeterPayload
 * @property {object} dataWith - Данные для создания нового показания счетчика.  Определите структуру этого объекта, если она известна.
 */

/**
 * @async
 * @function createTestMeter
 * @description Асинхронный Thunk для создания нового показания счетчика (тестовый).
 * @param {CreateTestMeterPayload} payload - Объект с данными для создания показания.
 * @param {object} thunkAPI - Объект Thunk API (Redux Toolkit).
 * @param {function} thunkAPI.rejectedWithValue - Функция для возврата отклоненного значения Thunk.
 * @param {function} thunkAPI.dispatch - Функция для отправки Redux экшенов.
 * @returns {Promise<void>}
 * @throws {Error} Если запрос завершается неудачно.  В реальном коде стоит добавить обработку ошибок.
 */
export const createTestMeter = createAsyncThunk(
    "api/testAddWater",
    async ({ dataWith }, { rejectedWithValue, dispatch }) => {
        try {
            const { data } = await $authHost.post("api/testAddWater", dataWith);

            dispatch(setLastMeters({ data }));
        } catch (error) {
            //  TODO:  Обработка ошибок.  Например:
            // return rejectedWithValue(error.response.data);
            console.error("Error creating test meter:", error);
            throw error; // Re-throw, чтобы thunk вернул rejected state
        }
    }
);

/**
 * @typedef {object} GetAllMetersByUserAndObjectPayload
 * @property {object} formQuery - Объект с параметрами запроса.
 * @property {string|number} formQuery.userId - ID пользователя.
 * @property {string|number} formQuery.objectBuildId - ID объекта строительства.
 */

/**
 * @async
 * @function getAllMetersByUserAndObject
 * @description Асинхронный Thunk для получения всех показаний счетчиков для пользователя и объекта.
 * @param {GetAllMetersByUserAndObjectPayload} payload - Объект с параметрами запроса.
 * @param {object} thunkAPI - Объект Thunk API (Redux Toolkit).
 * @param {function} thunkAPI.getState - Функция для получения текущего состояния Redux.
 * @param {function} thunkAPI.dispatch - Функция для отправки Redux экшенов.
 * @returns {Promise<void>}
 * @throws {Error} Если запрос завершается неудачно. В реальном коде стоит добавить обработку ошибок.
 */

export const getAllMetersByUserAndObject = createAsyncThunk(
    "api/testAddWater",
    async ({ formQuery }, { getState, dispatch }) => {
        try {
            /**
             * @typedef {object} FormQuery
             * @property {string|number} userId - ID пользователя.
             * @property {string|number} objectBuildId - ID объекта строительства.
             */

            /** @type {FormQuery} */
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
        } catch (error) {
            //  TODO:  Обработка ошибок.  Например:
            // return rejectedWithValue(error.response.data);
            console.error("Error getting all meters:", error);
            throw error; // Re-throw, чтобы thunk вернул rejected state
        }
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
export const testWaterMeterReducer = testWaterMeterSlice.reducer;
