import { Routes, Route } from "react-router";
import { lazy } from "react";
import React from "react";
import { RequireAuth } from "../features";
import Auth from "./auth";
import NoAccess from "./noAccess";
import { CheckAuthAndRole } from "../widgets";
import { EnRole } from "../shared/config/enumRole";

const SimplePage = lazy(() => import("./simple"));

export const Routing = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <CheckAuthAndRole role={[EnRole.ADMIN, EnRole.USER]}>
                        <SimplePage />
                    </CheckAuthAndRole>
                }
            />
            <Route path="/login" element={<Auth />} />
            <Route path="/no_access" element={<NoAccess />} />
        </Routes>
    );
};
