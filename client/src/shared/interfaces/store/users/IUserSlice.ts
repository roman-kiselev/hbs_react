import IUser from "./IUser";
import { IDataError } from "../error";
// Интерфейс для сосздания слайса
interface IUserSlice {
    user: IUser | null;
    isAuth: boolean;
    isLoading: boolean;
    isError: boolean;
    token: string | null;
    dataError: IDataError | null;
}

export default IUserSlice;
