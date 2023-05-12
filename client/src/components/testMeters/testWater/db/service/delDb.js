import db from "../db";

const dbName = "waterDatabase";
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
        db.close();
    });
};

export { delDbAndClose };
