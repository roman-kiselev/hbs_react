import { IUsersResponse } from "../../interfaces";
import { api } from "../main";

interface AddRoleDto {
    id: number;
    name: string;
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Получаем всех пользователей
        getAllUsers: builder.query<IUsersResponse[], void>({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
        }),
        // Добавляем роль для пользователя
        addRoleToUser: builder.mutation<IUsersResponse, AddRoleDto>({
            query: (dto) => ({
                url: `/users/role`,
                method: "POST",
                body: dto,
            }),
        }),
        // Удаляем роль для пользователя
        delRoleToUser: builder.mutation<IUsersResponse, AddRoleDto>({
            query: (dto) => ({
                url: `/users/delRole`,
                method: "POST",
                body: dto,
            }),
        }),
        // Получаем пользователя по id
        getUserById: builder.query<IUsersResponse, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
        }),

        // Удаляем по id Пользователя
        delUserById: builder.mutation<IUsersResponse, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = userApi;
export const { getAllUsers, getUserById } = userApi.endpoints;
