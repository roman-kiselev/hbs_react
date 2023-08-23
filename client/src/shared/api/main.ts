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

const baseQueryPlusPath = (path: string) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: process.env.REACT_APP_URL_API + path,
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

    return baseQuery;
};

const baseQueryWithRetry = retry(baseQuery, {
    maxRetries: 1,
});
const baseQueryWithRetryObject = retry(baseQueryPlusPath("/objects"), {
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
    reducerPath: "objectsMain",
    tagTypes: ["Objects"],
    baseQuery: baseQueryWithRetryObject,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});
