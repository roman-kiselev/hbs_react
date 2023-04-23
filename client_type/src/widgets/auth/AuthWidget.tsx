import React, { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { ButtonUI, InputString } from "../../shared/ui";
import { IInputStringProps } from "../../shared/interfaces";

const AuthWidget: React.FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const loginProps: IInputStringProps = {
        disabled: false,
        type: "text",
        value: login,
        title: "Логин",
        onChange: (e) => setLogin(e.target.value),
    };
    const passwordProps: IInputStringProps = {
        disabled: false,
        type: "password",
        value: password,
        title: "Пароль",
        onChange: (e) => setPassword(e.target.value),
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
                    <ButtonUI label="Вход" />
                </Form>
            </Card>
        </Container>
    );
};

export default AuthWidget;
