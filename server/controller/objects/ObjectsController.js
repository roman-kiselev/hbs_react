import * as path from "path";
import { uuid } from "uuidv4";
import Models from "../../models/models.js";

class ObjectsController {
    async createObject(req, res) {
        try {
            const { name, description } = req.body;

            if (req.files && req.files.img) {
                let fileName = uuid() + ".jpg";
                await img.mv(path.resolve("static/objects/img", fileName));

                const object = await Models.ObjectBuilds.create({
                    name,
                    description,
                    img: req.files.img || "",
                });
                return res.json(object);
            } else {
                const object = await Models.ObjectBuilds.create({
                    name,
                    description,
                    img: "",
                });
                return res.json(object);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getAll(req, res) {
        try {
            const objects = await Models.ObjectBuilds.findAll();
            return res.json({ objects });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new ObjectsController();
