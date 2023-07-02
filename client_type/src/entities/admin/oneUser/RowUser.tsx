import React from "react";
import { IUser } from "../../../shared/interfaces";
import { InputStringFormGroup } from "../../../shared/ui";

interface IRowUserProps {
    user: IUser;
}

const RowUser: React.FC<IRowUserProps> = ({ user }) => {
    return (
        <>
            <InputStringFormGroup
                disabled={false}
                title="Логин"
                value={user.login}
                onChange={() => {}}
            />
        </>
    );
};

export default RowUser;
