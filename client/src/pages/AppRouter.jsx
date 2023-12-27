import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import MainPageUsers from "../components/admin/users/views/MainPageUsers";

import { Layout } from "../shared/ui";
import HomePage from "./HomePage";
import AdminHomePage from "./admin/AdminHomePage";
import DescriptionRouter from "./description/DescriptionRouter";
import Auth from "./login/Auth";
import TreePageRouter from "./treePage/TreePageRouter";

const AppRouter = () => {
    const isAuth = useSelector((state) => state.users.isAuth);

    return (
        <Routes>
            {isAuth ? (
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path="object/:id/*"
                        element={<DescriptionRouter />}
                    />
                    <Route path="tree/*" element={<TreePageRouter />} />
                    {/* <Route index element={<DescriptionRouter />} /> */}
                    {/* <Route path="settings" element={<SettingsBolid />} />
                        <Route path="water" element={<DescriptionRouter />} /> */}

                    {/* <Route
                            path="addCoolMeterBolid"
                            element={<AddCoolMetersBolid />}
                        /> */}
                    {/* <Route
                            path="addHotMeterBolid"
                            element={<AddHotMeterBolid />}
                        />
                        <Route
                            path="addMeterCoolHotBolid"
                            element={<AddMeterCoolHotBolid />}
                        />
                        <Route
                            path="addCoolMeterPulsar"
                            element={<AddCoolMeterPulsar />}
                        />
                        <Route
                            path="temporaryPage"
                            element={<TestMainWaterPage />}
                        />
                        <Route
                            path="addHeatTest"
                            element={<TestMainHeatPage />}
                        />
                        <Route
                            path="addElectricalTest"
                            element={<TestMainElectricalPage />}
                        />
                        <Route
                            path="allKdlInObject"
                            element={<MainKdlInObject />}
                        />
                        <Route path="formHouse" element={<FormHousePage />} />
                        <Route path="settingsUp" element={<SettingsUp />} /> */}

                    <Route path="/admin" element={<AdminHomePage />}>
                        <Route path="users" element={<MainPageUsers />} />
                    </Route>

                    <Route path="/*" element={<Auth />}></Route>
                </Route>
            ) : (
                <Route>
                    <Route path="*" element={<Auth />} />
                </Route>
            )}
        </Routes>
    );
};

export default AppRouter;
