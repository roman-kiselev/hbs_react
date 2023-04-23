import { Routes, Route } from "react-router";
import { lazy } from "react";
import React from "react";
import { RequireAuth } from "../features";
import Auth from "./auth";

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
            <Route path="/login" element={<Auth />} />
        </Routes>
    );
};
