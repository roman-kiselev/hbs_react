import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router";
import { LoadingSpin } from "../../entities";
import { LoadingVariant } from "../../shared/config";
import { useAppSelector } from "../../shared/hooks";
import { IRequireAuthProps } from "../../shared/interfaces";
import { AppState } from "../../shared/interfaces/store";

// Компонент обрабатывает проверку авторизации
const RequireAuth: React.FC<IRequireAuthProps> = ({ children }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { isLoading, isAuth } = useAppSelector((state) => state.user);

    // useEffect(() => {
    //     dispatch(checkAuth())
    // }, [dispatch]);

    if (isLoading) {
        return <LoadingSpin variant={LoadingVariant.INFO} />;
    }

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default RequireAuth;
