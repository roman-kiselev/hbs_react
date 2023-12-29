import Models from "../../models/models.js";

class DeskService {
    async create(mainMeterId, objectBuildId) {
        try {
            const deskItem = await Models.Desk.create({
                status: "check",
                mainMeterId,
                objectBuildId,
            });

            const desk = await Models.Desk.findByPk(deskItem.id, {
                include: { all: true },
            });
            return desk;
        } catch (e) {
            console.log(e);
        }
    }
    // Удаляем по id
    async delete(id) {
        try {
            const desk = await Models.Desk.destroy({
                where: {
                    id,
                },
            });
            return id;
        } catch (e) {
            console.log(e);
        }
    }

    // изменение статуса
    async changeStatus(id, status) {
        try {
            const deskItem = await Models.Desk.findByPk(id);
            await deskItem.update({ status });
            const desk = await Models.Desk.findByPk(id, {
                include: { all: true },
            });
            return desk;
        } catch (e) {
            console.log(e);
        }
    }

    async getAll(objectBuildId) {
        try {
            const desk = await Models.Desk.findAll({
                where: {
                    objectBuildId,
                },
                include: { all: true },
                order: [["createdAt", "ASC"]],
            });

            return desk;
        } catch (e) {
            console.log(e);
        }
    }

    async getOne(id) {
        try {
            const desk = await Models.Desk.findByPk(id);
            return desk;
        } catch (e) {
            console.log(e);
        }
    }

    async getAllWhereCheck() {
        try {
            const desk = await Models.Desk.findAll({
                where: {
                    status: "check",
                },
            });
            return desk;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new DeskService();
