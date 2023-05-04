import { Request, Response } from "express";
import { createRole } from "../../services";
import { CreateRoleDto } from "../../dto";

class RoleController {
    async create(req: Request, res: Response) {
        try {
            const dto = req.body as CreateRoleDto;
            const role = await createRole(dto);
            return res.status(201).json(role);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new RoleController();
