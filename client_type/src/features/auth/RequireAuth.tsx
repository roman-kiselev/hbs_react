import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router";
import { LoadingSpin } from "../../entities";
import { useCheckQuery } from "../../shared/api";
import { LoadingVariant } from "../../shared/config";
import { useAppSelector } from "../../shared/hooks";
import { IRequireAuthProps } from "../../shared/interfaces";
import { authApi } from "../../shared/api";

// Компонент обрабатывает проверку авторизации
const RequireAuth: React.FC<IRequireAuthProps> = ({ children }) => {
    const location = useLocation();
    const { isLoading, isAuth } = useAppSelector((state) => state.user);
    const { isLoading: isCheckLoading, isSuccess } = authApi.useCheckQuery();

    if (isSuccess) {
        return <>{children}</>;
    }

    if (isLoading || isCheckLoading) {
        return <LoadingSpin variant={LoadingVariant.INFO} />;
    }

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default RequireAuth;
