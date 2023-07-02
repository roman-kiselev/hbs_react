import { IDataError } from "../error";

export interface ICreateObjectSlice {
    name: string;
    address: string;
    listObjects: any[] | null;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
