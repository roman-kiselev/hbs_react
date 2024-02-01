import { mainApi } from "../main";

export const statusRadioApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        createStatus: builder.mutation({
            query: (data) => {
                return {
                    url: `/api/statusRadio`,
                    method: "POST",
                    body: data,
                };
            },
        }),
        getCurrentStatus: builder.query({
            query: ({ mainMeterId }) => {
                return {
                    url: `/api/statusRadio/currentStatus/?mainMeterId=${mainMeterId}`,
                    method: "GET",
                };
            },
        }),
        getLastArr: builder.query({
            query: ({ mainMeterId }) => {
                return {
                    url: `/api/statusRadio/lastArr/?mainMeterId=${mainMeterId}`,
                    method: "GET",
                };
            },
        }),
    }),
});
