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

export const addDataExcelWater = async (objectBuildId, userId, jsonData) => {
    try {
        const { data } = await $authHost.post(
            `/api/testAddWater/addAllMetersExcel/?objectBuildId=${objectBuildId}&userId=${userId}`,
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

// Удаление по  id
export const deleteWaterMeter = async ({ id }) => {
    const { data } = await $authHost.delete(`api/testAddWater/${id}`);

    return data;
};
