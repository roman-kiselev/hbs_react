import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router";
import { LoadingSpin } from "../../entities";
import { LoadingVariant } from "../../shared/config";
import { IRequireAuthProps } from "../../shared/interfaces";
import { AppState } from "../../shared/interfaces/store";
// import { checkAuth } from "../../shared/models/users/userSlice";

// const checkIsAuth = async (dispatch: (action: any) => Promise<any>) => {
//     const { data } = await dispatch(checkAuth());
//     if (data) {
//         return true;
//     } else {
//         return false;
//     }
// };

// Компонент обрабатывает проверку авторизации
const RequireAuth: React.FC<IRequireAuthProps> = ({ children }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { isAuth, isLoading } = useSelector((state: AppState) => state.users);

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
