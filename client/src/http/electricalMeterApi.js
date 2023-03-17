import { $authHost, $host } from "./index";

export const getAllMetersElectrical = async (objectBuildId) => {
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
                    downloadLink.setAttribute("download", "electrical.xlsx");
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
        let n = 0;
        const { data } = await $authHost.post(
            `/api/testElectrical/addAllMetersExcel/?objectBuildId=${objectBuildId}&userId=${userId}`,
            { jsonData },
            {
                unUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    n = percentCompleted;
                },
            }
        );

        return data;
    } catch (e) {
        console.log(e);
        return e.message;
    }
};
