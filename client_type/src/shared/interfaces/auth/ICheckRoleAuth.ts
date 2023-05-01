import { IRole } from "../store";
import React from "react";

interface ICheckRoleAuth {
    children: React.ReactNode;
    role: string[];
}

export default ICheckRoleAuth;
