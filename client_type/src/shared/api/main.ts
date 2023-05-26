// import axios from "axios";

// const $host = axios.create({
//     baseURL: process.env.REACT_APP_URL_API,
// });

// const $authHost = axios.create({
//     baseURL: process.env.REACT_APP_URL_API,
// });

// const authInterceptor = (config) => {
//     config.header.authorization = `Bearer ${localStorage.getItem("token")}`;
//     return config;
// };

// $authHost.interceptors.request.use(authInterceptor);

// export { $host, $authHost };

import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL_API,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user;
    },
});

const baseQueryWithRetry = retry(baseQuery, {
    maxRetries: 1,
});

export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});
