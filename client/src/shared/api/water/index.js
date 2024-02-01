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
        getUniqueFloors: builder.query({
            query: ({ id }) => {
                return {
                    url: `/api/water/getFloors/${id}`,
                    method: "GET",
                };
            },
        }),
        getLinesForOneFloor: builder.query({
            query: ({ id, floor }) => {
                return {
                    url: `/api/water/getLines/${id}/?floor=${floor}`,
                    method: "GET",
                };
            },
        }),
        getLineMeterOneFloor: builder.query({
            query: ({ id, floor }) => {
                return {
                    url: `/api/water/getLineMeterOneFloor/${id}/?floor=${floor}`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useFindAllMetersForOneObjectQuery } = waterApi;
