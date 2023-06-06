import { Routes, Route } from "react-router";
import { lazy, startTransition, Suspense } from "react";
import React from "react";
//import Simple from "./simple";
//import Auth from "./auth";
import NoAccess from "./noAccess";
import { CheckAuthAndRole } from "../widgets";
import { EnRole } from "../shared/config/enumRole";
import Layout from "./layout";
import { LoadingSpin } from "../entities";
import { LoadingVariant } from "../shared/config";

const SimplePage = lazy(() => import("./simple"));
const Auth = lazy(() => import("./auth"));

export const Routing = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <CheckAuthAndRole role={[EnRole.ADMIN, EnRole.USER]}>
                        <Layout />
                    </CheckAuthAndRole>
                }
            >
                <Route
                    path="/"
                    element={
                        <Suspense
                            fallback={
                                <LoadingSpin
                                    variant={LoadingVariant.SECONDARY}
                                />
                            }
                        >
                            <SimplePage />
                        </Suspense>
                    }
                />
            </Route>
            {/* <Route
                path="/"
                element={
                    <CheckAuthAndRole role={[EnRole.ADMIN, EnRole.USER]}>
                        <SimplePage />
                    </CheckAuthAndRole>
                }
            /> */}
            {/* <Route path="/login" element={<Auth />} /> */}
            <Route
                path="/login"
                element={
                    <Suspense
                        fallback={
                            <LoadingSpin variant={LoadingVariant.SECONDARY} />
                        }
                    >
                        <Auth />
                    </Suspense>
                }
            />
            <Route path="/no_access" element={<NoAccess />} />
            <Route path="*" element={<NoAccess />} />
        </Routes>
    );
};
