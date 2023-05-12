import { $authHost, $host } from "./index";

export const getAllWaterMeter = async (objectBuildId) => {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const formattedDate = `${day}.${month}.${year}_${hours}.${minutes}.${seconds}`;

    const data = await $authHost
        .get(`/api/testAddWater/getAllMeters/?objectBuildId=${objectBuildId}`, {
            responseType: "blob",
        })
        .then((res) => {
            console.log(res);
            try {
                if (res && res.data) {
                    const blob = new Blob([res.data], {
                        type: "application/octet-stream",
                    });
                    const downloadLink = document.createElement("a");
                    const url = URL.createObjectURL(blob);
                    downloadLink.href = url;
                    downloadLink.setAttribute(
                        "download",
                        `Вода_${formattedDate}.xlsx`
                    );
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                }
            } catch (e) {
                console.log(e);
            }
        });
};

export const addDataExcelWater = async (
    objectBuildId,
    userId,
    checkSelected,
    jsonData
) => {
    try {
        const { data } = await $authHost.post(
            `/api/testAddWater/addAllMetersExcel/?objectBuildId=${objectBuildId}&userId=${userId}&checkSelected=${checkSelected}`,
            { jsonData },
            {
                unUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                },
            }
        );
    } catch (e) {
        console.log(e);
        return e.message;
    }
};

export const getTemplateFromServerWater = async (
    objectBuildId,
    section,
    numberKdl,
    multiplier
) => {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedDate = `${day}.${month}.${year}_${hours}.${minutes}.${seconds}`;

    try {
        const data = await $authHost
            .get(
                `/api/testAddWater/getTemplateWater/?objectBuildId=${objectBuildId}&section=${section}&numberKdl=${numberKdl}&multiplier=${multiplier}`,
                {
                    responseType: "blob",
                }
            )
            .then((res) => {
                if (res && res.data) {
                    const blob = new Blob([res.data], {
                        type: "application/octet-stream",
                    });
                    // Create a download link element
                    const downloadLink = document.createElement("a");
                    // Set the href and download attributes for the download link
                    const url = URL.createObjectURL(blob);
                    downloadLink.href = url;
                    downloadLink.setAttribute(
                        "download",
                        `Шаблон_вода_${formattedDate}.xlsx`
                    );
                    // Append the download link to the body
                    document.body.appendChild(downloadLink);
                    // Click the download link to start the download
                    downloadLink.click();
                }
            });
    } catch (e) {
        console.log(e);
        return e.message;
    }
};

// Удаление по  id
export const deleteWaterMeter = async ({ id }) => {
    const { data } = await $authHost.delete(`api/testAddWater/${id}`);

    return data;
};

export const getDat = async (objectBuildId, section, numberKdl) => {
    const { data } = await $authHost.get(
        `api/testAddWater/getDat/${objectBuildId}/?section=${section}&numberKdl=${numberKdl}`
    );

    return data;
};

export const getMeters = async (objectBuildId) => {
    const { data } = await $authHost.get(
        `api/testAddWater/getAllTable/${objectBuildId}`
    );

    return data;
};
export const getChangeTable = async (objectBuildId) => {
    const { data } = await $authHost.get(
        `api/testAddWater/getAllMetersChange/${objectBuildId}`
    );

    return data;
};

export const sincMeters = async (objectBuildId) => {
    const { data } = await $authHost.get(
        `api/testAddWater/synchronization/${objectBuildId}`
    );
    return data;
};

export const updateBulk = async (jsonData) => {
    try {
        const { data } = await $authHost.put(`api/testAddWater/updateBulk`, {
            jsonData,
        });
        return data;
    } catch (e) {
        console.error(e);
    }
};

export const getTable = async (objectBuildId) => {
    const { data } = await $authHost.get(
        `api/testAddWater/getTableForOffline/${objectBuildId}`
    );
    console.log(data);
    return data;
};
