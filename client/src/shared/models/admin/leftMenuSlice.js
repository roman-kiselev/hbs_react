import { createSlice } from "@reduxjs/toolkit";

/**
 * Slice для хранения состояния отображения левой меню админа
 * @function
 * @param {Object} state - состояние
 * @param {Object} action - действие
 * @property {boolean} show - отображать ли меню
 */
const initialState = {
    show: false,
};

/**
 * Создает slice
 * @function
 * @param {Object} config - конфигурация
 * @param {string} config.name - имя slice
 * @param {Object} config.initialState - начальное состояние
 * @param {Object} config.reducers - редюсеры
 * @returns {Object} slice
 */
export const leftMenuAdminSlice = createSlice({
    name: "leftMenuAdmin",
    initialState,
    reducers: {
        /**
         * Устанавливает отображение меню
         * @function
         * @param {Object} state - состояние
         * @param {Object} action - действие
         * @property {boolean} action.payload - отображать ли меню
         */
        setShow: (state, action) => {
            state.show = action.payload;
        },
    },
});

/**
 * Экшн для установки отображения меню
 * @type {Function}
 */
export const { setShow } = leftMenuAdminSlice.actions;

/**
 * Редюсер для slice
 * @type {Function}
 */
export const leftMenuAdminReducer = leftMenuAdminSlice.reducer;
