import dbHeat from "../dbHeat";

const dbName = "heatDatabase";
const delDb = async () => {
    return new Promise((resolve, reject) => {
        const deleteRequest = window.indexedDB.deleteDatabase(dbName);
        deleteRequest.onerror = reject;
        deleteRequest.onsuccess = () => {
            resolve();
        };
    });
};

const delDbAndClose = async () => {
    await delDb().then(() => {
        dbHeat.close();
    });
};

export { delDbAndClose };
