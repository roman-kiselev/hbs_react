import React from "react";
import { NavbarAskue } from "../../entities";
import { useAppSelector } from "../../shared/hooks";

const NavbarAskueFeaters: React.FC = () => {
    const { isAuth, user } = useAppSelector((store) => store.user);

    if (!isAuth || user === null) {
        return <></>;
    }
    const { roles } = user;

    return <NavbarAskue role={roles} />;
};

export default NavbarAskueFeaters;
