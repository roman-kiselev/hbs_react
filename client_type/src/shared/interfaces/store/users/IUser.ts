import IRole from "./IRole";

// Интерфейс для пользователя
interface IUser {
    id: number;
    login: string;
    role: IRole[];
}

export default IUser;
