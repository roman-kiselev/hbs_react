import { IDataError } from "../errors";
import { IUser } from "./IUser";

export interface IUserSlice {
    user: IUser | null;
    isAuth: boolean;
    isLoading: boolean;
    isError: boolean;
    token: string | null;
    dataError: IDataError | null;
}
