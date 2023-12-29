import { mainApi } from "../main.js";

export const metersApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        findByNumber: builder.query({
            query: ({ number, objectBuildId }) => {
                return {
                    url: `/api/meters/?number=${number}&objectBuildId=${objectBuildId}`,
                    method: "GET",
                };
            },
        }),
        checkMeter: builder.query({
            query: ({ number, objectBuildId, typeMeter }) => {
                return {
                    url: `/api/meters/check/?number=${number}&objectBuildId=${objectBuildId}&typeMeter=${typeMeter}`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useFindByNumberQuery } = metersApi;
