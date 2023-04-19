import React from "react";
import { configNav } from "../../shared/config";
import { NavAskue } from "./ui";
const NavbarAskue: React.FC = () => {
    return (
        <>
            <NavAskue configData={configNav} />
        </>
    );
};

export default NavbarAskue;
