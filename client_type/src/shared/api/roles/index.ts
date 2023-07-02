import { IRole } from "../../interfaces";
import { api } from "../main";

interface IRoleResponse extends IRole {
    description: string;
    createdAt: string;
    updatedAt: string;
}

export const rolesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Получаем всех пользователей
        getAllRoles: builder.query<IRoleResponse[], void>({
            query: () => ({
                url: "/roles",
                method: "GET",
            }),
        }),
        // Получаем пользователя по id
        getRoleById: builder.query<IRoleResponse, string>({
            query: (id) => ({
                url: `/roles/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAllRolesQuery, useGetRoleByIdQuery } = rolesApi;
export const { getAllRoles, getRoleById } = rolesApi.endpoints;
