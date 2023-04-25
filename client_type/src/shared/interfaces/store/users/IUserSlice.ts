import IUser from "./IUser";

// Интерфейс для сосздания слайса
interface IUserSlice {
    user: IUser | null;
    isAuth: boolean;
    isLoading: boolean;
    isError: boolean;
}

export default IUserSlice;
