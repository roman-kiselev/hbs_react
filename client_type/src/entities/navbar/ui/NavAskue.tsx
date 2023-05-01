import React from "react";
import NavLinkAskue from "./NavLinkAskue";
import { IRole, INavLinkAskueProps } from "../../../shared/interfaces";

interface INavAskue {
    configData: INavLinkAskueProps[];
    role: IRole[];
}

const NavAskue: React.FC<INavAskue> = ({ configData, role }) => {
    return (
        <>
            {configData.map((item) => (
                <NavLinkAskue key={item.to} {...item} role={role} />
            ))}
        </>
    );
};

export default NavAskue;
