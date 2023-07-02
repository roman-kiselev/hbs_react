import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL_API,
    prepareHeaders: (headers, { getState }) => {
        const token =
            (getState() as RootState).user.token ||
            localStorage.getItem("token");

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithRetry = retry(baseQuery, {
    maxRetries: 1,
});

export const api = createApi({
    reducerPath: "api",
    tagTypes: ["Api"],
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});

export const objectsMainApi = createApi({
    reducerPath: "objects",
    tagTypes: ["Objects"],
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});
