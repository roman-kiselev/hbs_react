import sequelize from "sequelize";
import { MainAddMeter } from "../../../../models";

interface IGetNumberKdl {
    numberKdl: number;
}

class PulsarWaterService {
    async getAllChannelByNumberDevice(numberKdl: number) {
        try {
            const allChannel = await MainAddMeter.findAll({
                where: {
                    numberKdl,
                },
            });
            return allChannel;
        } catch (e) {
            console.error(e);
        }
    }

    async getAllDeviceInObject(objectBuildId: number) {
        try {
            const devices: IGetNumberKdl[] = await MainAddMeter.findAll({
                attributes: [
                    [
                        sequelize.fn("DISTINCT", sequelize.col("numberKdl")),
                        "numberKdl",
                    ],
                ],
                where: {
                    objectBuildId,
                },
                limit: 20,
            });

            const arr = await Promise.all(
                devices.map(async ({ numberKdl }) => {
                    const dataOneDevice: MainAddMeter[] =
                        await this.getAllChannelByNumberDevice(numberKdl);

                    return {
                        numberKdl: numberKdl,
                        data: dataOneDevice,
                    };
                })
            );

            return arr;
        } catch (e) {
            console.error(e);
        }
    }
}

export default new PulsarWaterService();
