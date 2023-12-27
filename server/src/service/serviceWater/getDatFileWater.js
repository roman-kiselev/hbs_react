import Models from "../../models/models.js";

// Функция возвращает дату формата День.Месяц.Год Час.Минута.Секунда
const getTime = () => {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
};

export const getDatFile = async (objectBuildId, section, numberKdl) => {
    try {
        // Получаем все каналы по секции и номеру кдл
        const channels = await Models.MainAddMeter.findAll({
            where: {
                objectBuildId,
                section,
                numberKdl,
            },
            attributes: [
                ["numberAsr", "channel"],
                ["sumMeter", "sum"],
            ],
        });

        return {
            channels,
            time: getTime(),
        };
    } catch (e) {
        console.log(e);
    }
};
