import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import React from "react";
import NoAccess from "./noAccess";
import { CheckAuthAndRole } from "../widgets";
import { EnRole } from "../shared/config/enumRole";
import Layout from "./layout";
import { LoadingSpin } from "../entities";
import { LoadingVariant } from "../shared/config";

const HomePageRoute = lazy(() => import("./homePage"));
const Auth = lazy(() => import("./auth"));
const AdminPanelRoute = lazy(() => import("./admin"));
const ManagmentRoute = lazy(() => import("./managment"));
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
                    index
                    element={
                        <Suspense
                            fallback={
                                <LoadingSpin
                                    variant={LoadingVariant.SECONDARY}
                                />
                            }
                        >
                            <HomePageRoute />
                        </Suspense>
                    }
                />
            </Route>
            <Route
                path="admin/*"
                element={
                    <CheckAuthAndRole role={[EnRole.ADMIN]}>
                        <Suspense
                            fallback={
                                <LoadingSpin
                                    variant={LoadingVariant.SECONDARY}
                                />
                            }
                        >
                            <AdminPanelRoute />
                        </Suspense>
                        {/* <AdminPanelRoute /> */}
                    </CheckAuthAndRole>
                }
            />
            <Route
                path="managment/*"
                element={
                    <CheckAuthAndRole role={[EnRole.MANAGER]}>
                        <Suspense
                            fallback={
                                <LoadingSpin
                                    variant={LoadingVariant.SECONDARY}
                                />
                            }
                        >
                            <ManagmentRoute />
                        </Suspense>
                        {/* <AdminPanelRoute /> */}
                    </CheckAuthAndRole>
                }
            />

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
