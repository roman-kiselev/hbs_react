import { IWarehouse } from "../warehouse";

export interface IObject {
    id: number;
    name: string;
    address: string;
    updatedAt: string;
    createdAt: string;
    deletedAt: boolean | null;
    warehouse: IWarehouse[] | null;
}
