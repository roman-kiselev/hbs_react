import { IDataError } from "../error";

export interface ICreateObjectSlice {
    name: string;
    description: string;
    img: string | null;
    listObjects: any[] | null;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
