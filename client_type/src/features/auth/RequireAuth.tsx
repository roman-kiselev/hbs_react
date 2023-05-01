import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router";
import { IRequireAuthProps } from "../../shared/interfaces";
import { AppState } from "../../shared/interfaces/store";
// Компонент обрабатывает проверку авторизации
const RequireAuth: React.FC<IRequireAuthProps> = ({ children }) => {
    const { isAuth, isError, isLoading, user } = useSelector(
        (state: AppState) => state.users
    );

    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
};

export default RequireAuth;
