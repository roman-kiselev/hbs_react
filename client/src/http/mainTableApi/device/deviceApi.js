import { $authHost } from "../../index";

// Получаем все уникальные КДЛ

export const getAllKdlBySectionId = async (objectBuildId, section) => {
    const { data } = await $authHost.get(
        `api/mainTable/kdl/?id=${objectBuildId}&section=${section}`
    );

    return data;
};
