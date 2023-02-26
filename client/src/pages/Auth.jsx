import React, {useState} from 'react';
import {Card, Container, Form, Row, Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {setUser, setIsAuth, loginIn} from "../features/user/userSlice";
import {useNavigate} from "react-router-dom";


const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const checkAndRedirect = async () => {
        try {
            let data = await dispatch(loginIn({login, password}))

            if (data.payload != undefined) {
                const {login, role, id } = data.payload
                dispatch(setUser({ login, role, id }))
                dispatch(setIsAuth(true))
                return navigate("/")
            } else {
                console.log("Error_111")
            }
        } catch (e) {
            console.log(e)
        }
    }



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
                            onClick={
                                () => checkAndRedirect()
                            }
                            className="mt-3 pointer-event" variant={"outline-success"}>
                            Войти
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;