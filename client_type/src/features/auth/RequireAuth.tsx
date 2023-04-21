import React from "react";
import { useLocation, Navigate } from "react-router";
import { IRequireAuthProps } from "../../shared/interfaces";
// Компонент обрабатывает проверку авторизации
const RequireAuth: React.FC<IRequireAuthProps> = ({ children }) => {
    const isAuth = true;
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
};

export default RequireAuth;
