import { mainApi } from "../main";

export const objectsApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllObjects: builder.query({
            query: () => {
                return {
                    url: `/api/object`,
                    method: "GET",
                };
            },
        }),
        getUniqSection: builder.query({
            query: ({ objectBuildId }) => {
                return {
                    url: `/api/sections/getUniq/${objectBuildId}`,
                    method: "GET",
                };
            },
        }),
        getUniqFloors: builder.query({
            query: ({ objectBuildId, numberSection }) => {
                return {
                    url: `/api/floors/getUniq/${objectBuildId}/?numberSection=${numberSection}`,
                    method: "GET",
                };
            },
        }),
    }),
});
