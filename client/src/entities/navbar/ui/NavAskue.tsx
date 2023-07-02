import React from "react";
import NavLinkAskue from "./NavLinkAskue";
import { IRole, INavLinkAskueProps } from "../../../shared/interfaces";

interface INavAskue {
    configData: INavLinkAskueProps[];
    roles: IRole[];
}

const NavAskue: React.FC<INavAskue> = ({ configData, roles }) => {
    return (
        <>
            {configData.map((item) => (
                <NavLinkAskue
                    key={item.to}
                    {...item}
                    accessFor={item.accessFor}
                    roles={roles}
                />
            ))}
        </>
    );
};

export default NavAskue;
