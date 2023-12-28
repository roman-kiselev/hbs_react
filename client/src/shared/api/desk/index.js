import { mainApi } from "../main.js";

export const deskApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        // Добавляем
        create: builder.mutation({
            query: ({ mainMeterId, objectBuildId }) => ({
                url: "/api/desk",
                method: "POST",
                body: { mainMeterId, objectBuildId },
            }),
        }),
        getAll: builder.query({
            query: (id) => ({
                url: `/api/desk/?objectBuildId=${id}`,
                method: "GET",
            }),
        }),
        getOne: builder.query({
            query: ({ id }) => ({
                url: `/api/desk/${id}`,
                method: "GET",
            }),
        }),
        // getAllWhereCheck
        getAllWhereCheck: builder.query({
            query: () => ({
                url: "/api/desk/check",
                method: "GET",
            }),
        }),
        // Удаляем по id
        delete: builder.mutation({
            query: (id) => ({
                url: `/api/desk/${id}`,
                method: "DELETE",
            }),
        }),
        // изменение статуса
        changeStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/api/desk/${id}`,
                method: "PUT",
                body: { status },
            }),
        }),
    }),
});
