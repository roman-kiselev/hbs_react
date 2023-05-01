import React from "react";
import { NavLink } from "react-router-dom";
import { INavLinkAskueProps, IRole } from "../../../shared/interfaces";
interface INavAskue {
    role: IRole[];
}

interface INavLinkAskue extends INavLinkAskueProps, INavAskue {}

const NavLinkAskue: React.FC<INavLinkAskue> = ({
    color = "grey",
    margin = 7,
    textDecoration = "none",
    title,
    to,
    role,
}) => {
    return (
        <NavLink style={{ margin, textDecoration, color }} to={to}>
            {title}
        </NavLink>
    );
};

export default NavLinkAskue;
