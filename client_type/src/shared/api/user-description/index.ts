import { api } from "../main";

export const userDescriptionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Получем всех пользователей
        getUserDescription: builder.query<any, void>({
            query: () => ({
                url: "/user-description",
                method: "GET",
            }),
        }),
        // Получаем пользователя по id
        getUserDescriptionById: builder.query<any, string>({
            query: (id) => ({
                url: `/user-description/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetUserDescriptionQuery } = userDescriptionApi;
export const { getUserDescription } = userDescriptionApi.endpoints;
