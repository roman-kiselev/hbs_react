import React from "react";
import NavLinkAskue from "./NavLinkAskue";
import { IConfig } from "../../../shared/interfaces";

const NavAskue: React.FC<IConfig> = ({ configData }) => {
    return (
        <>
            {configData.map((item) => (
                <NavLinkAskue key={item.to} {...item} />
            ))}
        </>
    );
};

export default NavAskue;
