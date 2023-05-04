import ApiError from "../../lib";
import { Role } from "../../models/user";
import { CreateRoleDto } from "../../dto";

export const createRole = async (dto: CreateRoleDto) => {
    try {
        const role = await Role.create(dto);
        if (!role) {
            return ApiError.badRequest("Не удаётся создать роль");
        }
    } catch (e) {
        console.log(e);
        return ApiError.serverError("Ошибка сервера");
    }
};
