import React from "react";
import { Nav } from "react-bootstrap";
import NavLinkAskue from "./NavLinkAskue";
import { IConfig } from "../../../shared/interfaces";

const NavAskue: React.FC<IConfig> = ({ configData }) => {
    return (
        <h6>
            {configData.map((item) => (
                <NavLinkAskue key={item.to} {...item} />
            ))}
        </h6>
    );
};

export default NavAskue;
