import React from "react";
import { ICheckRoleAuth } from "../../shared/interfaces";
import { RequireAuth, CheckRoleAuth } from "../../features";

const CheckAuthAndRole: React.FC<ICheckRoleAuth> = ({ children, role }) => {
    return (
        <RequireAuth>
            <CheckRoleAuth role={role}>{children}</CheckRoleAuth>
        </RequireAuth>
    );
};

export default CheckAuthAndRole;
