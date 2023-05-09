import { Role } from "../../models/user";
import IRoleCreate from "./IRoleCreate";

interface IUserCreate {
    login: string;
    password: string;
    role: string;
}

export default IUserCreate;
