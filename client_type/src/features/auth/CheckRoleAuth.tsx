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
}

const CheckRoleAuth: React.FC<ICheckRoleAuth> = ({ children, role }) => {
    const location = useLocation();

    const { roles: roleState } = useAppSelector((state) => state.user.user);
    const { isLoading } = useAppSelector((state) => state.user);

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
