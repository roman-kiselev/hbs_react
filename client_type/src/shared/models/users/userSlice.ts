import jwt_decode from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";
import { IUser, IUserSlice } from "../../interfaces";
import { authApi } from "../../api/auth";
import { IDataError } from "../../interfaces/store";
import { userApi } from "../../api";

// Задаём начальное значение
const initialState: IUserSlice = {
    isAuth: false,
    user: null,
    isLoading: false,
    isError: false,
    token: null,
    dataError: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            localStorage.removeItem("token");
            state.isAuth = false;
            state.token = null;
            state.user = null;
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
                state.isLoading = false;
                const { token } = action.payload;
                const user: IUser = jwt_decode(token);
                //localStorage.setItem("token", token);
                const { id, login, roles } = user;
                state.user = { id, login, roles };
                state.isAuth = true;
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
                const { status, data } = action.payload as IDataError;
                state.dataError = {
                    status: Number(status),
                    data,
                };
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
                const { id, login, roles } = user;
                state.user = { id, login, roles };
                state.isAuth = true;
                state.token = token;
                state.isLoading = false;
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
                const { status, data } = action.payload as IDataError;
                state.dataError = {
                    status: Number(status),
                    data,
                };
            }
        );
        // Удаляем роль
        builder.addMatcher(
            userApi.endpoints.delRoleToUser.matchPending,
            (state, action) => {
                state.isLoading = true;
            }
        );
        builder.addMatcher(
            userApi.endpoints.delRoleToUser.matchFulfilled,
            (state, action) => {
                state.isLoading = false;
                state.user.roles = action.payload.roles;
            }
        );
        builder.addMatcher(
            userApi.endpoints.delRoleToUser.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }
        );
    },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
