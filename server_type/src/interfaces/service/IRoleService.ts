import { CreateRoleDto } from "../../dto";
import { Role } from "../../models/user";

export interface IRoleService {
    createRole: (dto: CreateRoleDto) => Promise<any>;
    getAllRoles: () => Promise<any>;
    getRoleByNameS: (name: string) => Promise<any>;
    getRoleById: (id: string) => Promise<any>;
    updateRole: (id: string, dto: CreateRoleDto) => Promise<any>;
    deleteRole: (id: string) => Promise<any>;
}
