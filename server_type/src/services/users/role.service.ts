import ApiError from "../../lib";
import { Role } from "../../models/user";
import { CreateRoleDto } from "../../dto";

export const createRole = async (dto: CreateRoleDto) => {
    try {
        const [role, created] = await Role.findOrCreate({
            where: { name: dto.name },
            defaults: dto,
        });
        if (!created) {
            return ApiError.badRequest("Роль с таким именем уже существует");
        }
        if (!role) {
            return ApiError.badRequest("Не удаётся создать роль");
        }
        return role;
    } catch (e) {
        console.log(e);
        return ApiError.serverError("Ошибка сервера");
    }
};

// {
//     "role": {
//         "status": "200",
//         "message": "Роль успешно создана",
//       "id": 8,
//       "name": "Nhfdfsf",
//       "updatedAt": "2023-05-04T13:38:52.210Z",
//       "createdAt": "2023-05-04T13:38:52.210Z"
//     }
//   }
