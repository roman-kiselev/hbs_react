import { CaseReducer } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import {
    CreateHandler,
    IDataError,
    IToken,
    IUser,
    IUserSlice,
} from "../../interfaces";

class Login implements CreateHandler<IUserSlice, IToken, IDataError> {
    pending: CaseReducer<IUserSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<IUserSlice, { payload: IToken; type: string }> = (
        state,
        action
    ) => {
        state.isAuth = true;
        const { token } = action.payload;
        const user: IUser = jwt_decode(token);
        const { id, login, roles } = user;
        state.user = { id, login, roles };
        state.token = token;
    };

    rejected: CaseReducer<IUserSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuth = false;
        localStorage.removeItem("token");
        state.token = null;
        const { status, data } = action.payload as IDataError;
        state.dataError = {
            status: Number(status),
            data,
        };
    };
}

export default new Login();
