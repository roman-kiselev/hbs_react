import React from "react";
import { NavLink } from "react-router-dom";
import { INavLinkAskueProps, IRole } from "../../../shared/interfaces";
interface INavAskue {
    roles: IRole[];
}

interface INavLinkAskue extends INavLinkAskueProps, INavAskue {}

const NavLinkAskue: React.FC<INavLinkAskue> = ({
    color = "grey",
    margin = 7,
    textDecoration = "none",
    title,
    to,
    roles,
    accessFor,
}) => {
    // В roles лежат роли из store
    // В accessFor лежат роли у которых есть доступ
    let isRole: boolean = false;
    if (accessFor && accessFor.length !== 0) {
        accessFor.forEach((role) => {
            roles.forEach((item) => {
                if (item.name === role) {
                    isRole = true;
                }
            });
        });
    }

    return (
        <>
            {isRole ? (
                <NavLink style={{ margin, textDecoration, color }} to={to}>
                    {title}
                </NavLink>
            ) : (
                <></>
            )}
        </>
    );
};

export default NavLinkAskue;
