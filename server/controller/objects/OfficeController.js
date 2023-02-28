import Models from "../../models/models.js";

class OfficeController {

    async createOffice (req, res) {
        try {
            const {id: idObject} = req.query
            const {number} = req.body
            /*const object = await Models.ObjectBuilds.findOne({where: {id}})*/
            const office = await Models.Office.create({number, objectBuildId: idObject})

            return res.json({office})

        } catch (e) {
            console.log(e)
        }
    }

    async createOfficeBySection (req, res) {
        try {
            const {id: idObject, sectionId} = req.query
            const {number} = req.body
            /*const object = await Models.ObjectBuilds.findOne({where: {id}})*/
            const office = await Models.Office.create({number, sectionId, objectBuildId: idObject})

            return res.json({office})
        } catch (e) {
            console.log(e)
        }
    }

    async getAllOffice (req, res) {
        try {

            const office = await Models.Office.findAll({include: {all: true}})
            return res.json({office})

        } catch (e) {
            console.log(e)
        }
    }

    async getOneOffice (req, res) {
        try {
            const {id} = req.params
            const office = await Models.Office.findOne({where: {id},include: {all: true}})
            return res.json({office})

        } catch (e) {
            console.log(e)
        }
    }
}


export default new OfficeController();