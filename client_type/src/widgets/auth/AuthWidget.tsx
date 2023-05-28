import React, { useState } from "react";

import { Card, Container, Form } from "react-bootstrap";
import { InputString } from "../../shared/ui";
import { IInputStringProps } from "../../shared/interfaces";
import { LoadingSpin } from "../../entities";
import { LoadingVariant } from "../../shared/config";

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
                    {/* <ButtonUI
                        label="Вход"
                        onClick={() => handleClick(dispatch)}
                    /> */}
                    {/* {isError ? (
                        <Alert className="text-center mt-3" variant={"danger"}>
                            Неверный логин или пароль
                        </Alert>
                    ) : (
                        <></>
                    )} */}
                </Form>
            </Card>
        </Container>
    );
};

export default AuthWidget;
