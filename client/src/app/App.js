import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../pages/AppRouter";
import { check, setIsAuth, setUser } from "../shared/models";

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
