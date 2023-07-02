import jwt_decode from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";
import { authApi, userApi } from "../../api";
import { IUser } from "../../interfaces";

interface IListUsers {
    list: IUser[];
    isLoading: boolean;
    isError: boolean;
}

const initialState: IListUsers = {
    list: [],
    isLoading: false,
    isError: false,
};

const listUsersSlice = createSlice({
    name: "listUsers",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            userApi.endpoints.getAllUsers.matchPending,
            (state, action) => {
                state.isLoading = true;
            }
        );
        builder.addMatcher(
            userApi.endpoints.getAllUsers.matchFulfilled,
            (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            }
        );
        builder.addMatcher(
            userApi.endpoints.getAllUsers.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }
        );

        builder.addMatcher(authApi.endpoints.register.matchPending, (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(
            authApi.endpoints.register.matchFulfilled,
            (state, action) => {
                state.isLoading = false;
                const { token } = action.payload;
                const user: IUser = jwt_decode(token);
                const newUser: IUser = {
                    id: user.id,
                    login: user.login,
                    roles: user.roles,
                };
                state.list = [...state.list, newUser];
            }
        );
        builder.addMatcher(
            authApi.endpoints.register.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }
        );

        // Удаляем пользователя
        builder.addMatcher(
            userApi.endpoints.delUserById.matchFulfilled,
            (state, action) => {
                state.list = state.list.filter(
                    (user) => user.id !== action.payload.id
                );
            }
        );

        builder.addMatcher(
            userApi.endpoints.delUserById.matchRejected,
            (state, action) => {
                state.isError = true;
            }
        );
    },
});

export const listUserReducer = listUsersSlice.reducer;
