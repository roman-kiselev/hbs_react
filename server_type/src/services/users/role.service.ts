import ApiError from "../../lib";
import { Role } from "../../models/user";
import { CreateRoleDto } from "../../dto";
import { IRoleService } from "../../interfaces";

const createRole = async (dto: CreateRoleDto) => {
    try {
        const [role, created] = await Role.findOrCreate({
            where: { name: dto.name },
            defaults: dto,
        });

        if (!created) {
            return ApiError.notFound(
                "Роль с таким именем уже существует",
                role
            );
        }
        if (!role) {
            return ApiError.badRequest("Не удаётся создать роль");
        }
        return ApiError.ok("Роль успешно создана", role);
    } catch (e) {
        console.log(e);
    }
};

const getAllRoles = async () => {
    try {
        return await Role.findAll();
    } catch (e) {
        console.log(e);
    }
};

const getRoleById = async (id: string) => {
    try {
        const role = await Role.findByPk(id);
        if (!role) {
            return ApiError.badRequest("Роль не найдена");
        }
        return role;
    } catch (e) {
        console.log(e);
    }
};

// Редактируем роль
const updateRole = async (id: string, dto: CreateRoleDto) => {
    try {
        const role = await Role.findByPk(id);
        if (!role) {
            return ApiError.badRequest("Роль не найдена");
        }
        await role.update(dto);
        return ApiError.ok("Роль успешно обновлена", role);
    } catch (e) {
        console.log(e);
    }
};

// Удаляем роль
const deleteRole = async (id: string) => {
    try {
        const role = await Role.findByPk(id);
        if (!role) {
            return ApiError.badRequest("Роль не найдена");
        }
        await role.destroy();
        return ApiError.ok("Роль успешно удалена", role);
    } catch (e) {
        console.log(e);
    }
};

const getRoleByNameService = async (name: string) => {
    try {
        const role = await Role.findOne({ where: { name } });
        if (!role) {
            return ApiError.badRequest("Роль не найдена");
        }

        return role;
    } catch (e) {
        console.log(e);
    }
};

class RoleService implements IRoleService {
    createRole(dto: CreateRoleDto) {
        return createRole(dto);
    }
    getAllRoles() {
        return getAllRoles();
    }
    getRoleByNameS(name: string) {
        return getRoleByNameService(name);
    }
    getRoleById(id: string) {
        return getRoleById(id);
    }
    updateRole(id: string, dto: CreateRoleDto) {
        return updateRole(id, dto);
    }
    deleteRole(id: string) {
        return deleteRole(id);
    }
}

export default new RoleService();
