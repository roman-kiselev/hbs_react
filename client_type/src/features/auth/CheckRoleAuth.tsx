import React from "react";
import { Navigate, useLocation } from "react-router";
import { LoadingSpin } from "../../entities";
import { LoadingVariant } from "../../shared/config";
import { useAppSelector } from "../../shared/hooks";
import { ICheckRoleAuth } from "../../shared/interfaces";
import { IRole } from "../../shared/interfaces/store";

function findRole(roles: string[], roleState: IRole[]): boolean {
    //const { role, roleState } = arg;
    // Пробегаеимся по roleState
    // Разрешённые роли в массиве role
    let foundMatch = false;
    roleState.forEach((oneRole: IRole) => {
        roles.forEach((role: string) => {
            if (role === oneRole.name) {
                foundMatch = true;
            }
        });
    });
    return foundMatch;
    // for (let i = 0; i < role.length; i++) {
    //     if (roleState.some((oneRole: IRole) => oneRole.name === role[i])) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}

const CheckRoleAuth: React.FC<ICheckRoleAuth> = ({ children, role }) => {
    const location = useLocation();
    const { isLoading } = useAppSelector((state) => state.user);
    const { roles: roleState } = useAppSelector((state) => state.user.user);

    if (isLoading) {
        return <LoadingSpin variant={LoadingVariant.INFO} />;
    }
    // Проверяем есть ли роль в массиве

    const isRole = findRole(role, roleState);
    if (!isRole) {
        return <Navigate to="/no_access" state={{ from: location }} />;
    }

    return <div>{children}</div>;
};

export default CheckRoleAuth;
