import IRole from "./users/IRole";
import IUser from "./users/IUser";
import IUserSlice from "./users/IUserSlice";
import IUserLogin from "./users/IUserLogin";

interface AppState {
    users: IUserSlice;
}

export type { IRole, IUser, IUserSlice, IUserLogin, AppState };
