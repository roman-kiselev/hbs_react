import jwt_decode from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";
import { IUser, IUserSlice } from "../../interfaces";
import { authApi } from "../../api/auth";

// Интерфейс для входа

// Задаём начальное значение
const initialState: IUserSlice = {
    isAuth: false,
    user: null,
    isLoading: false,
    isError: false,
    token: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuth = false;
            localStorage.removeItem("token");
        },
    },

    extraReducers(builder) {
        builder.addMatcher(
            authApi.endpoints.login.matchPending,
            (state, action) => {
                state.isLoading = true;
            }
        );
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, action) => {
                const { token } = action.payload;
                const user: IUser = jwt_decode(token);
                //localStorage.setItem("token", token);
                const { id, login, roles } = user;
                state.user = { id, login, roles };
                state.isAuth = true;
                state.isLoading = false;
                state.token = token;
            }
        );
        builder.addMatcher(
            authApi.endpoints.login.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.isAuth = false;
                localStorage.removeItem("token");
                state.token = null;
            }
        );
        builder.addMatcher(
            authApi.endpoints.check.matchPending,
            (state, action) => {
                state.isLoading = true;
            }
        );
        builder.addMatcher(
            authApi.endpoints.check.matchFulfilled,
            (state, action) => {
                const { token } = action.payload;
                const user: IUser = jwt_decode(token);
                //localStorage.setItem("token", token);
                const { id, login, roles } = user;
                state.user = { id, login, roles };
                state.isAuth = true;
                state.isLoading = false;
                state.token = token;
            }
        );
        builder.addMatcher(
            authApi.endpoints.check.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.isAuth = false;
                localStorage.removeItem("token");
                state.token = null;
            }
        );
    },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
