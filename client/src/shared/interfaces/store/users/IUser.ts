import IRole from "./IRole";

// Интерфейс для пользователя
interface IUser {
    id: number;
    login: string;
    password?: string;
    updatedAt?: string;
    createdAt?: string;
    roles?: IRole[];
}

export default IUser;
