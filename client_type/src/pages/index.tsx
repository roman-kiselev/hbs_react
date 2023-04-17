import { Routes, Route } from "react-router";
import { lazy } from "react";
import React from "react";

const SimplePage = lazy(() => import("./simple"));

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<SimplePage />} />
        </Routes>
    );
};
