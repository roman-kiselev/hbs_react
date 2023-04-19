import React from "react";
import { NavLink } from "react-router-dom";
import { INavLinkAskueProps } from "../../../shared/interfaces";

const NavLinkAskue: React.FC<INavLinkAskueProps> = ({
    color = "grey",
    margin = 7,
    textDecoration = "none",
    title,
    to,
}) => {
    return (
        <NavLink style={{ margin, textDecoration, color }} to={to}>
            {title}
        </NavLink>
    );
};

export default NavLinkAskue;
