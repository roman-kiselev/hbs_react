import { createSlice } from "@reduxjs/toolkit";
import { authApi, userApi } from "../../api";
import { IRole, IUser, IUserDescription } from "../../interfaces";
import jwt_decode from "jwt-decode";
interface IOneUserSlice {
    user: IUser | null;
    roles: IRole[];
    userDescriptions: IUserDescription | null;
    isLoading: boolean;
    isError: boolean;
}

const initialState: IOneUserSlice = {
    user: null,
    roles: [],
    userDescriptions: null,
    isLoading: false,
    isError: false,
};

const oneUserSlice = createSlice({
    name: "oneUser",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            userApi.endpoints.getUserById.matchPending,
            (state) => {
                state.isLoading = true;
            }
        );
        builder.addMatcher(
            userApi.endpoints.getUserById.matchFulfilled,
            (state, action) => {
                state.isLoading = false;
                const { id, login, password, createdAt, updatedAt } =
                    action.payload;
                const { roles } = action.payload;
                const { userDescriptions } = action.payload;
                state.user = {
                    id,
                    login,
                    password,
                    createdAt,
                    updatedAt,
                };
                state.roles = roles;
                state.userDescriptions = userDescriptions;
            }
        );

        builder.addMatcher(
            userApi.endpoints.getUserById.matchRejected,
            (state) => {
                state.isLoading = false;
                state.isError = true;
            }
        );

        builder.addMatcher(
            userApi.endpoints.addRoleToUser.matchPending,
            (state, action) => {
                state.isLoading = true;
            }
        );
        builder.addMatcher(
            userApi.endpoints.addRoleToUser.matchFulfilled,
            (state, action) => {
                state.isLoading = false;
                state.roles = action.payload.roles;
            }
        );
        builder.addMatcher(
            userApi.endpoints.addRoleToUser.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
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
                state.roles = action.payload.roles;
            }
        );
        builder.addMatcher(
            userApi.endpoints.delRoleToUser.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }
        );
        // Добавляем при LOGIN
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, action) => {
                const { token } = action.payload;
                const user: IUser = jwt_decode(token);
                const { id, login, roles } = user;
                state.user = { id, login, roles };
                state.isLoading = false;
                state.roles = roles;
            }
        );
        // Добавляем при CHECK
        builder.addMatcher(
            authApi.endpoints.check.matchFulfilled,
            (state, action) => {
                const { token } = action.payload;
                const user: IUser = jwt_decode(token);
                const { id, login, roles } = user;
                state.user = { id, login, roles };
                state.isLoading = false;
                state.roles = roles;
            }
        );
    },
});

export const oneUserReducer = oneUserSlice.reducer;
