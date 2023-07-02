import React, { useState } from "react";
import { Alert, Card, Container, Form } from "react-bootstrap";
import { ButtonUI, InputString } from "../../shared/ui";
import { IInputStringProps } from "../../shared/interfaces";
import { LoadingSpin } from "../../entities";
import { LoadingVariant } from "../../shared/config";
import { authApi, useLoginMutation } from "../../shared/api";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useAppSelector } from "../../shared/hooks";

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

const AuthWidget: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [login, loginProps] = useLogin();
    const [password, passwordProps] = usePassword();
    // Получим статус и ошибку
    const { isError, dataError } = useAppSelector((store) => store.user);

    const userData = {
        login,
        password,
    };

    const [loginMutation, { isLoading }] = useLoginMutation();
    const { isLoading: isCheckLoading, data } = authApi.useCheckQuery();
    const { user } = useAppSelector((store) => store.user);
    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        try {
            const login = loginMutation(userData);
            if (login && user !== null) {
                navigate(location.state?.from || "/", { replace: true });
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (isLoading || isCheckLoading) {
        return <LoadingSpin variant={LoadingVariant.INFO} />;
    }
    if (data && user !== null) {
        navigate("/", { replace: true });
    }

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
                        variant="success"
                        onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => handleSubmit(e)}
                        label="Вход"
                    />
                    {isError && dataError.data ? (
                        <Alert className="text-center mt-3" variant={"danger"}>
                            {dataError.data.message}
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
