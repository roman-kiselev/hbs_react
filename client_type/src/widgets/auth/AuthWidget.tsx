import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Alert, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ButtonUI, InputString } from "../../shared/ui";
import { IInputStringProps } from "../../shared/interfaces";
//import { loginUser, checkAuth } from "../../shared/models";
import { AppState, IUserLogin } from "../../shared/interfaces/store";
import { LoadingSpin } from "../../entities";
import { LoadingVariant } from "../../shared/config";
import { useLoginMutation } from "../../shared/api";
import { authApi } from "../../shared/api/auth";

const useLogin = () => {
    const [login, setLogin] = useState("");
    const loginProps: IInputStringProps = {
        disabled: false,
        type: "text",
        value: login,
        title: "Логин",
        onChange: (e) => setLogin(e.target.value),
    };
    return [login, loginProps] as const;
};
const usePassword = () => {
    const [password, setPassword] = useState("");
    const passwordProps: IInputStringProps = {
        disabled: false,
        type: "password",
        value: password,
        title: "Пароль",
        onChange: (e) => setPassword(e.target.value),
    };
    return [password, passwordProps] as const;
};
// Проверить state isAuth  и переадресовать на главную страницу
// const checkAndRedirect = async (
//     dispatch: (action: any) => Promise<any>,
//     navigate: ReturnType<typeof useNavigate>
// ) => {
//     try {
//         const data = await dispatch(checkAuth());
//         if (data) {
//             navigate("/");
//         }
//     } catch (e) {
//         console.log(e);
//     }
// };

const check = (isLoading) => {
    if (isLoading) {
        return <LoadingSpin variant={LoadingVariant.DARK} />;
    }
};

const AuthWidget: React.FC = () => {
    const [login, loginProps] = useLogin();
    const [password, passwordProps] = usePassword();
    const userData = {
        login,
        password,
    };
    const [loginUser, loginUserResult] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, isLoading, isAuth } = useSelector(
        (state: AppState) => state.users
    );

    const {} = authApi.useCheckQuery();
    useEffect(() => {
        check(isLoading);
    }, [isLoading]);

    const handleClick = async (dispatch: (action: any) => Promise<any>) => {
        try {
            //const data = await dispatch(loginUser(userData));
            const data = await dispatch(loginUser(userData));
            if (data) {
                navigate("/");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: "600px" }}>
                <Form className="m-5 d-flex justify-content-center flex-column">
                    <h2>Авторизация</h2>
                    <InputString {...loginProps} />
                    <InputString {...passwordProps} />
                    <ButtonUI
                        label="Вход"
                        onClick={() => handleClick(dispatch)}
                    />
                    {isError ? (
                        <Alert className="text-center mt-3" variant={"danger"}>
                            Неверный логин или пароль
                        </Alert>
                    ) : (
                        <></>
                    )}
                </Form>
            </Card>
        </Container>
    );
};

export default AuthWidget;
