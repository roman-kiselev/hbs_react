import React from "react";
import { useNavigate } from "react-router";
import { NavbarAskue } from "../../entities";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { INavLinkAskueProps } from "../../shared/interfaces";
import { logout } from "../../shared/models";

interface INavAskue {
    configData: INavLinkAskueProps[];
}

const NavbarAskueFeaters: React.FC<INavAskue> = ({ configData }) => {
    const { isAuth, user } = useAppSelector((store) => store.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    if (!isAuth || user === null) {
        return <></>;
    }
    const { roles } = user;
    const handleLogout = () => {
        navigate("/login", { replace: true });
        dispatch(logout());
    };

    return (
        <NavbarAskue
            roles={roles}
            configData={configData}
            logout={handleLogout}
        />
    );
};

export default NavbarAskueFeaters;
