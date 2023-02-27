import Models from "../../models/models.js";

class FloorsController {

    async createFloors (req, res) {
        try {
            const {id: idObject} = req.query
            const {number} = req.body
            /*const object = await Models.ObjectBuilds.findOne({where: {id}})*/
            const floor = await Models.Floors.create({number, objectBuildId: idObject})

            return res.json({floor})

        } catch (e) {
            console.log(e)
        }
    }

    async createFloorsBySection (req, res) {
        try {
            const {id: idObject, sectionId} = req.query
            const {number} = req.body
            /*const object = await Models.ObjectBuilds.findOne({where: {id}})*/
            const floor = await Models.Floors.create({number, sectionId, objectBuildId: idObject})

            return res.json({floor})
        } catch (e) {
            console.log(e)
        }
    }

    async getAllFloors (req, res) {
        try {

            const floors = await Models.Floors.findAll({include: {all: true}})
            return res.json({floors})

        } catch (e) {
            console.log(e)
        }
    }

    async getOneFloors (req, res) {
        try {
            const {id} = req.params
            const floors = await Models.Floors.findOne({where: {id},include: {all: true}})
            return res.json({floors})

        } catch (e) {
            console.log(e)
        }
    }

}

export default new FloorsController();