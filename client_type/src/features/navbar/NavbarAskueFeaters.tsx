import React from "react";
import { useSelector } from "react-redux";
import { NavbarAskue } from "../../entities";
import { AppState } from "../../shared/interfaces/store";

const NavbarAskueFeaters: React.FC = () => {
    const { isAuth, user, isLoading, isError } = useSelector(
        (state: AppState) => state.users
    );

    if (!isAuth || user === null) {
        return <></>;
    }
    const { role } = user;

    return <NavbarAskue role={role} />;
};

export default NavbarAskueFeaters;
