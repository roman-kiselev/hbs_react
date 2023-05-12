import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { LoadingSpin } from "../../entities";
import { LoadingVariant } from "../../shared/config";
import { ICheckRoleAuth } from "../../shared/interfaces";
import { AppState } from "../../shared/interfaces/store";
import { IRole } from "../../shared/interfaces/store";

function findRole(role: string[], roleState: IRole[]): boolean {
    //const { role, roleState } = arg;
    // Пробегаеимся по roleState
    // Разрешённые роли в массиве role
    for (let i = 0; i < role.length; i++) {
        if (roleState.some((oneRole: IRole) => oneRole.name === role[i])) {
            return true;
        } else {
            return false;
        }
    }
}

const CheckRoleAuth: React.FC<ICheckRoleAuth> = ({ children, role }) => {
    const location = useLocation();
    const { isLoading } = useSelector((state: AppState) => state.users);
    const { roles: roleState } = useSelector(
        (state: AppState) => state.users.user
    );
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
