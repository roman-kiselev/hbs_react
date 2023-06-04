import IUser from "./IUser";

// Интерфейс для сосздания слайса
interface IUserSlice {
    user: IUser | null;
    isAuth: boolean;
    isLoading: boolean;
    isError: boolean;
    token: string | null;
}

export default IUserSlice;
