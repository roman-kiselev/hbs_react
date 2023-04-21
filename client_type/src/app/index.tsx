import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavbarAskue from "../entities/navbar";
import { Routing } from "../pages";

const App = () => {
    const isAuth = true;

    return (
        <BrowserRouter>
            <>{isAuth ? <NavbarAskue /> : <></>}</>
            <Routing />
        </BrowserRouter>
    );
};

export default App;
