import chalk from "chalk";
import pkg from "sequelize";
import Models from "../../models/models.js";
import TestExcelService from "../../service/testExcel/TestExcelService.js";

const { Op } = pkg;







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
            // Передаём тип счётчика с условием ИЛИ
            let typeMeterCool = 'Счётчик холодной воды'
            let typeMeterHot = 'Счётчик горячей воды'

            //console.log(limit, page, offset)
            //console.log(chalk.magenta(limit, page, offset))

            const listMeters = await Models.MainAddMeter.findAndCountAll({
                where: {
                    objectBuildId: objectId,
                    userId,
                    [Op.or]: [
                        {typeMeter: typeMeterCool},
                        {typeMeter: typeMeterHot}
                    ]
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


    async getOneMeter (req, res) {
        try {
            // Получаем id счётчика
            const {id} = req.params
            // Получаем данные о счётчике
            const {
                floors,
                flat,
                numberMeter,
                sum,
                asr,
                kdl,
                typeMeter,
                section
            } = req.body

            // Тепере получаем устройство по id
            const device = await Models.MainAddMeter.findOne({
                where: {
                    id
                }
            })
            // Добавляем новые данные к этому устройству
            await device.update({
                section,
                floor: floors,
                flat,
                numberMeter,
                sumMeter: sum,
                numberKdl: kdl,
                numberAsr: asr,
            })

            return res.json(device)

             
        } catch (e) {
            console.log(e)
        }
    }
    

    async getExcelTest (req, res) {
        
        const {objectId} = req.query
        // Устанавливаем id объекта
        const listMeters = new TestExcelService(1)
        // Задаём имя excel файлу
        listMeters.setFileName('Счётчики_1111.xlsx')
        // Добавляем путь файла
        listMeters.setPathWithFileName()
        // Создаём excel файл
        await listMeters.getExcelWaterMeter()
        
        return res.download(listMeters.getPathWithFileName, (err) => {
            if (err) {
                console.log(err)
            }
        })
    }


}


export default new TestWaterMeterController();