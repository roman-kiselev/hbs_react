import { Request, Response } from "express";
import { RoleService } from "../../services";
import { CreateRoleDto } from "../../dto";

class RoleController {
    async create(req: Request, res: Response) {
        try {
            const dto = req.body as CreateRoleDto;
            const role = await RoleService.createRole(dto);
            return res.status(201).json(role);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const roles = await RoleService.getAllRoles();

            return res.status(200).json(roles);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getRoleByName(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const role = await RoleService.getRoleByNameS(name);
            return res.status(200).json(role);
        } catch (e) {
            console.log(e);
        }
    }

    async getRoleById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const role = await RoleService.getRoleById(id);
            return res.status(200).json(role);
        } catch (e) {
            console.log(e);
        }
    }

    // Редактировать роль
    async updateRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const dto = req.body as CreateRoleDto;
            const role = await RoleService.updateRole(id, dto);
            return res.status(200).json(role);
        } catch (e) {
            console.log(e);
        }
    }

    // Удалить роль
    async deleteRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const role = await RoleService.deleteRole(id);
            return res.status(200).json(role);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new RoleController();
