import { Routes, Route } from "react-router";
import { lazy } from "react";
import React from "react";
import { RequireAuth } from "../features";

const SimplePage = lazy(() => import("./simple"));

export const Routing = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <SimplePage />
                    </RequireAuth>
                }
            />
        </Routes>
    );
};
