import { IDataError } from "../error";
import IRole from "../users/IRole";
// Интерфейс для сосздания слайса
interface IRolesSlice {
    roles: IRole[] | null;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}

export default IRolesSlice;
