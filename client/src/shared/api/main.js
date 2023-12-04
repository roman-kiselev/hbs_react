import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { $authHost } from "../../http";

const baseQuery = fetchBaseQuery({
    baseUrl: $authHost.getUri(),
});

const baseQueryWithRetry = retry(baseQuery, {
    maxRetries: 1,
});

export const mainApi = createApi({
    reducerPath: "mainApi",
    baseQuery: baseQueryWithRetry,
    tagTypes: ["MainTable"],
    endpoints: () => ({}),
});
