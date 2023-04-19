import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavbarAskue from "../entities/navbar";
import { Routing } from "../pages";
//import { withProviders } from "./providers";

const App = () => {
    return (
        <BrowserRouter>
            <NavbarAskue />
            <Routing />
        </BrowserRouter>
    );
};

export default App;
