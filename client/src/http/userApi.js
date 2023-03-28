import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registrationUser = async (login, password, role) => {
    const { data } = await $host.post("api/user/registration", {
        login,
        password,
        role,
    });
    return data;
};

export const login = async (email, password) => {
    const { data } = await $host.post("api/user/login", { email, password });
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};

export const check = async (email, password) => {
    const { data } = await $authHost.get("api/user/auth");
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};

export const getAllUsers = async () => {
    const { data } = await $authHost.get("api/user/");
    return data;
};

export const getAllRoles = async () => {
    const { data } = await $authHost.get("api/role/");
    return data;
};

export const createRole = async (name) => {
    const { data } = await $authHost.post("api/role/", { name });
    return data;
};
