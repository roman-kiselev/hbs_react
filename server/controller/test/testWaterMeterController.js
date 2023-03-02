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

            const {userId, objectId} = req.query
            console.log(userId, objectId)
            const listMeters = await Models.MainAddMeter.findAndCountAll({
                where: {
                    objectBuildId: objectId,
                    userId
                },
                limit: 20,
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