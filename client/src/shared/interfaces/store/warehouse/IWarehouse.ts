import { IObject } from "../objects";

export interface IWarehouse {
    id: number;
    name: string;
    address: string;
    updatedAt: string;
    createdAt: string;
    deletedAt: boolean | null;
    prices: any[] | null;
    objects: IObject[] | null;
}
