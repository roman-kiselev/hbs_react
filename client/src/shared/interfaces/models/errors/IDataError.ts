import { IMessage } from "./IMessage";

export interface IDataError {
    status: number | null;
    data: IMessage;
}
