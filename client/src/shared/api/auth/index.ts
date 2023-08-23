import { IToken, IUserLoginAttr } from "../../interfaces";
import { api } from "../main";

export type UserData = IUserLoginAttr;
type ResponseLoginData = IUserLoginAttr & { token: string };

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IToken, UserData>({
            query: (userData) => ({
                url: "/user/login",
                method: "POST",
                body: userData,
            }),
        }),
        register: builder.mutation<IToken, UserData>({
            query: (userData) => ({
                url: "/auth/registration",
                method: "POST",
                body: userData,
            }),
        }),
        check: builder.query<IToken, void>({
            query: () => ({
                url: "/user/auth",
                method: "GET",
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useCheckQuery } = authApi;

export const { check, login, register } = authApi.endpoints;
