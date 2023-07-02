import { IUserLogin } from "../../interfaces";
import { api } from "../main";

export type UserData = IUserLogin;
type ResponseLoginData = IUserLogin & { token: string };

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: "/auth/login",
                method: "POST",
                body: userData,
            }),
        }),
        register: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: "/auth/registration",
                method: "POST",
                body: userData,
            }),
        }),
        check: builder.query<ResponseLoginData, void>({
            query: () => ({
                url: "/auth/check",
                method: "GET",
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useCheckQuery } = authApi;

export const { check, login, register } = authApi.endpoints;
