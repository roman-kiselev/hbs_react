import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

export const withRouter = (component: () => React.ReactNode) => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>{component()}</Suspense>
        </BrowserRouter>
    );
};
