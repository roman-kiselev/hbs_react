import chalk from "chalk";
import Models from "../../models/models.js";

class TestWaterMeterController {


    async addNewMeter (req, res) {
        try {

            const {
                section,
                floors,
                flat,
                kdl,
                channelCool,
                channelHot,
                numberMeterCool,
                numberMeterHot,
                sumMeterCool,
                sumMeterHot,
                userId,
                objectId
            } = req.body



            const coolMeter = {
                section: section,
                floor: floors,
                flat: flat,
                typeMeter: 'Счётчик холодной воды',
                numberKdl: kdl,
                numberAsr: channelCool,
                numberMeter: numberMeterCool,
                sumMeter: sumMeterCool,
                objectBuildId: objectId,
                userId: userId
            }

            const hotMeter = {
                section: section,
                floor: floors,
                flat: flat,
                typeMeter: 'Счётчик горячей воды',
                numberKdl: kdl,
                numberAsr: channelHot,
                numberMeter: numberMeterHot,
                sumMeter: sumMeterHot,
                objectBuildId: objectId,
                userId: userId
            }


            const waterMeter = await Models.MainAddMeter.bulkCreate([
                coolMeter, hotMeter
            ])

            return res.json(waterMeter)


        } catch (e) {
            console.log(e)
        }
    }

    async getAllByIdUserAndObject (req, res) {

        try {
            
            // Получаем данные для постраничной навигации
            let {userId, objectId, limit, page} = req.query
            page = Number(page) || 1
            limit = Number(limit) || 6
            let offset = page * limit - limit
            
            //console.log(limit, page, offset)
            //console.log(chalk.magenta(limit, page, offset))

            const listMeters = await Models.MainAddMeter.findAndCountAll({
                where: {
                    objectBuildId: objectId,
                    userId
                },
                limit: limit,
                offset: offset,
                order: [
                    ['id', 'DESC']
                ]
            })

            return res.json({listMeters})

        } catch (e) {
            console.log(e)
        }
    }


}


export default new TestWaterMeterController();