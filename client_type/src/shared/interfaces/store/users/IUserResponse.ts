import IUser from "./IUser";
import { IUserDescription } from "./IUserDescription";

export interface IUsersResponse extends IUser {
    userDescriptions?: IUserDescription;
}
