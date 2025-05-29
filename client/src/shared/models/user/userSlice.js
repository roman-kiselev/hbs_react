import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { $authHost, $host } from "../../../http/index.js";

/**
 * Initial state for user slice
 * @type {Object}
 * @property {Object} user - User information
 * @property {boolean} isAuth - Authentication status
 */
const initialState = {
    user: {},
    isAuth: false,
};

/**
 * Async thunk for logging in a user
 */
export const loginIn = createAsyncThunk(
    "api/user/login",
    /**
     * @param {Object} args - Arguments for login
     * @param {string} args.login - User login
     * @param {string} args.password - User password
     * @param {Object} thunkAPI - Thunk API
     * @returns {Promise<Object>} - Decoded JWT token
     */
    async ({ login, password }, { rejectedWithValue, dispatch }) => {
        const { data } = await $host.post("api/user/login", {
            login,
            password,
        });
        localStorage.setItem("token", data.token);
        return jwt_decode(data.token);
    }
);

/**
 * Async thunk for checking user authentication
 */
export const check = createAsyncThunk(
    "api/user/auth",
    /**
     * @param {undefined} _ - Placeholder parameter
     * @param {Object} thunkAPI - Thunk API
     * @returns {Promise<Object>} - Decoded JWT token
     */
    async (_, { rejectWithValue, dispatch }) => {
        const { data } = await $authHost.get("api/user/auth");
        localStorage.setItem("token", data.token);
        return jwt_decode(data.token);
    }
);

/**
 * User slice
 */
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        /**
         * Set user information
         * @param {Object} state - Current state
         * @param {Object} action - Action payload
         */
        setUser: (state, action) => {
            let { login, role, id } = action.payload;
            state.user = {
                id: id,
                login: login,
                role: role,
            };
        },

        /**
         * Get user login
         * @param {Object} state - Current state
         * @param {Object} action - Action payload
         * @returns {Object} - User login
         */
        getUser: (state, action) => {
            return {
                login: state.user.login,
            };
        },

        /**
         * Set authentication status
         * @param {Object} state - Current state
         * @param {Object} action - Action payload
         */
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    },
    extraReducers: {
        [check.pending]: () => console.log("pending"),
        [check.fulfilled]: () => console.log("fulfilled"),
        [check.rejected]: () => console.log("rejected"),
        [loginIn.pending]: () => console.log("pending"),
        [loginIn.fulfilled]: () => console.log("fulfilled"),
        [loginIn.rejected]: () => console.log("rejected"),
    },
});

export const { setUser, getUser, setIsAuth } = userSlice.actions;
export const userReducer = userSlice.reducer;
