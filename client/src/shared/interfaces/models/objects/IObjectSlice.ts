import { IDataError } from "../errors";
import { IObject } from "./IObject";

export interface IObjectSlice {
    objects: IObject[] | [];
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
