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
        getInvalidWaterMeters: builder.query({
            query: ({ number, objectBuildId }) => {
                return {
                    url: `/api/meters/invalidWater/${objectBuildId}/?number=${number}`,
                    method: "GET",
                };
            },
        }),
        getInvalidHeatMeters: builder.query({
            query: ({ number, objectBuildId }) => {
                return {
                    url: `/api/meters/invalidHeat/${objectBuildId}/?number=${number}`,
                    method: "GET",
                };
            },
        }),
        getInvalidElectricalMeters: builder.query({
            query: ({ number, objectBuildId }) => {
                return {
                    url: `/api/meters/invalidElectrical/${objectBuildId}/?number=${number}`,
                    method: "GET",
                };
            },
        }),
        getRepeatingMeters: builder.query({
            query: ({ objectBuildId }) => {
                return {
                    url: `/api/meters/repeatingMeter/${objectBuildId}`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useFindByNumberQuery } = metersApi;
