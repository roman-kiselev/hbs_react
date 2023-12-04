import { mainApi } from "../main.js";

export const waterApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        findAllMetersForOneObject: builder.query({
            query: ({ id }) => {
                return {
                    url: `/api/water/${id}`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useFindAllMetersForOneObjectQuery } = waterApi;
