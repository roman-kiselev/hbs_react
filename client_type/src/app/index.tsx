import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NavbarAskueFeaters } from "../features";
import { Routing } from "../pages";

const App = () => {
    return (
        <BrowserRouter>
            <NavbarAskueFeaters />
            <Routing />
        </BrowserRouter>
    );
};

export default App;
