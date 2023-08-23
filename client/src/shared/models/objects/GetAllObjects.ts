import { CaseReducer } from "@reduxjs/toolkit";

import {
    CreateHandler,
    IDataError,
    IObject,
    IObjectSlice,
} from "../../interfaces";

class GetAllObjects
    implements CreateHandler<IObjectSlice, IObject[], IDataError>
{
    pending: CaseReducer<IObjectSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<IObjectSlice, { payload: IObject[]; type: string }> =
        (state, action) => {
            state.objects = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.dataError = null;
        };

    rejected: CaseReducer<IObjectSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IDataError;
        state.dataError = {
            data: data,
            status: Number(status),
        };
    };
}

export default new GetAllObjects();
