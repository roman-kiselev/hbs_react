import { IOneWaterMain } from "../../interfaces";

export interface IWaterMeterSlice {
    mainTable: IOneWaterMain[];
    currentPage: number;
    perPage: number;
    totalCount: number;
    lastMeter: IOneWaterMain[];
    limit: number;
}
