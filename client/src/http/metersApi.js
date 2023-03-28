import { $authHost, $host } from "./index";

export const createRole = async (name) => {
    const { data } = await $authHost.post("api/role/", { name });
    return data;
};
