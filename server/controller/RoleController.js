import Models from "../models/models.js";

class RoleController {
    async createRole(req, res) {
        try {
            const { name } = req.body;
            console.log(name);
            const role = await Models.Role.create({ name });
            return res.json({ role });
        } catch (e) {
            console.log(e);
        }
    }

    async getAllRoles(req, res) {
        try {
            const roles = await Models.Role.findAll();
            return res.json({ roles });
        } catch (e) {
            console.log(e);
        }
    }

    async getOneRole(req, res) {
        try {
            const { id } = req.params;
            const role = await Models.Role.findOne({ where: { id } });
            return res.json({ role });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new RoleController();
