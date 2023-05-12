import IRole from "./IRole";

// Интерфейс для пользователя
interface IUser {
    id: number;
    login: string;
    roles: IRole[];
}

export default IUser;
