import { useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authApi } from "../shared/api";

const Auth = () => {
    const navigate = useNavigate();
    const [handleLogin, { isSuccess }] = authApi.useLoginMutation();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const checkAndRedirect = async () => {
        try {
            const res = await handleLogin({ login, password });
            console.log(res);
            if (isSuccess) {
                return navigate("/");
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
                <h2 className="m-auto">{"Авторизация"}</h2>
                <Form className="m-5 d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите login..."
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between">
                        <Button
                            onClick={() => checkAndRedirect()}
                            className="mt-3 pointer-event"
                            variant={"outline-success"}
                        >
                            Войти
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;
