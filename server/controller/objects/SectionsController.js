import Models from "../../models/models.js";

class SectionsController {

    async createSections (req, res) {
        try {
            const {id: idObject} = req.query
            const {number} = req.body

            const sections = await Models.Section.create({number, objectBuildId: idObject})

            return res.json({sections})

        } catch (e) {
            console.log(e)
        }
    }

    async createSectionsBy (req, res) {
        try {
            const {id: idObject, sectionId} = req.query
            const {number} = req.body
            /*const object = await Models.ObjectBuilds.findOne({where: {id}})*/
            const sections = await Models.Section.create({number, sectionId, objectBuildId: idObject})

            return res.json({sections})
        } catch (e) {
            console.log(e)
        }
    }

    async getAllSections (req, res) {
        try {
            // Постраничный вывод
            let {limit, page} = req.query
            page = page || 1
            limit = limit || 4
            let offset = page * limit - limit


            const sections = await Models.Section.findAndCountAll({
                include: {
                    all: true
                },
                limit,
                offset
            })
            return res.json({sections})

        } catch (e) {
            console.log(e)
        }
    }

    async getOneSections (req, res) {
        try {
            const {id} = req.params
            const sections = await Models.Section.findOne({where: {id},include: {all: true}})
            return res.json({sections})

        } catch (e) {
            console.log(e)
        }
    }
}


export default new SectionsController();