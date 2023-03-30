import { $authHost, $host } from "../../index";

// Возвращает только уникальные номера секций
export const getAllSections = async (objectBuildId) => {
    const { data } = await $authHost.get(
        `api/mainTable/sections/?id=${objectBuildId}`
    );
    return data;
};
