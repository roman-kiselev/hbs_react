import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "../pages";
//import { withProviders } from "./providers";

const App = () => {
    return (
        <BrowserRouter>
            <Routing />
        </BrowserRouter>
    );
};

export default App;
