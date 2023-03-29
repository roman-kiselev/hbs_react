import { $authHost } from "../index";

// Получаем все уникальные КДЛ

export const getAllKdl = async (objectBuildId) => {
    const { data } = await $authHost.get(`api/mainTable/kdl/${objectBuildId}`);
    return data;
};
