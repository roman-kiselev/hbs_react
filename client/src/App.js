import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useDispatch, useSelector } from "react-redux";
import { check, setUser, setIsAuth } from "./features/user/userSlice";
import { Spinner } from "react-bootstrap";

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let response = dispatch(check())
            .then((data) => {
                if (data.payload == undefined) {
                } else {
                    const { login, id, role } = data.payload;
                    dispatch(setUser({ login, id, role }));
                    dispatch(setIsAuth(true));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Spinner animation={"grow"} />;
    }

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
