import { IRole } from "../roles";

export interface IUser {
    id: number;
    login: string;
    password?: string;
    updatedAt?: string;
    createdAt?: string;
    roles?: IRole[];
}
