import { $authHost, $host } from "./index";

export const getAllMetersElectrical = async (objectBuildId) => {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedDate = `${day}.${month}.${year}_${hours}.${minutes}.${seconds}`;
    const data = await $authHost
        .get(
            `/api/testElectrical/getAllMeters/?objectBuildId=${objectBuildId}`,
            { responseType: "blob" }
        )
        .then((res) => {
            try {
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
                        `Электрика_${formattedDate}.xlsx`
                    );
                    // Append the download link to the body
                    document.body.appendChild(downloadLink);
                    // Click the download link to start the download
                    downloadLink.click();
                }
            } catch (e) {
                console.log(e);
            }
        });
};

export const addDataExcel = async (objectBuildId, userId, jsonData) => {
    try {
        const { data } = await $authHost.post(
            `/api/testElectrical/addAllMetersExcel/?objectBuildId=${objectBuildId}&userId=${userId}`,
            { jsonData },
            {
                unUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                },
            }
        );

        return data;
    } catch (e) {
        console.log(e);
        return e.message;
    }
};

// Получаем линии счётчиков
export const getAllLinesElectrical = async (objectBuildId) => {
    try {
        const { data } = await $authHost.get(
            `/api/testElectrical/line/?objectBuildId=${objectBuildId}`
        );

        return data;
    } catch (e) {
        console.log(e);
    }
};

// Получаем шаблон тепло
export const getTemplateFromServerElectrical = async (
    objectBuildId,
    template,
    line
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
                `/api/testElectrical/getTemplateElectrical/?objectBuildId=${objectBuildId}&template=${template}&line=${line}`,
                {
                    responseType: "blob",
                }
            )
            .then((res) => {
                console.log(res);
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
                        `Шаблон_электрика_${formattedDate}.xlsx`
                    );
                    // Append the download link to the body
                    document.body.appendChild(downloadLink);
                    // Click the download link to start the download
                    downloadLink.click();
                }
            });
    } catch (e) {
        console.log(e);
    }
};
