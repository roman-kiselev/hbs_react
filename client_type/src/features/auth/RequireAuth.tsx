import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router";
import { LoadingSpin } from "../../entities";
import { LoadingVariant } from "../../shared/config";
import { IRequireAuthProps } from "../../shared/interfaces";
import { AppState } from "../../shared/interfaces/store";
import { checkAuth } from "../../shared/models/users/userSlice";

const checkIsAuth = async (dispatch: (action: any) => Promise<any>) => {
    const response = await dispatch(checkAuth());
    console.log(response);
    return response;
};

// Компонент обрабатывает проверку авторизации
const RequireAuth: React.FC<IRequireAuthProps> = ({ children }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { isAuth, isError, isLoading, user } = useSelector(
        (state: AppState) => state.users
    );
    //console.log(localStorage);
    useEffect(() => {
        checkIsAuth(dispatch);
    }, []);
    if (isLoading) {
        return <LoadingSpin variant={LoadingVariant.INFO} />;
    }

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default RequireAuth;
