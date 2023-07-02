import React from "react";
import { NavbarAskue } from "../../entities";
import { useAppSelector } from "../../shared/hooks";
import { INavLinkAskueProps, IRole } from "../../shared/interfaces";

interface INavAskue {
    configData: INavLinkAskueProps[];
}

const NavbarAskueFeaters: React.FC<INavAskue> = ({ configData }) => {
    const { isAuth, user } = useAppSelector((store) => store.user);

    if (!isAuth || user === null) {
        return <></>;
    }
    const { roles } = user;

    return <NavbarAskue roles={roles} configData={configData} />;
};

export default NavbarAskueFeaters;
