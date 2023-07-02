import { IUsersResponse } from "../../interfaces";
import { api } from "../main";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Получаем всех пользователей
        getAllUsers: builder.query<IUsersResponse[], void>({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
        }),
        // Получаем пользователя по id
        getUserById: builder.query<IUsersResponse, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = userApi;
export const { getAllUsers, getUserById } = userApi.endpoints;
