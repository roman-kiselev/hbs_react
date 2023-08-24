import { Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import DescriptionObject from "../pages/DescriptionObject";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import AdminHomePage from "../pages/admin/AdminHomePage";
import Description from "./addMeters/Description";
import AddCoolMetersBolid from "./addMeters/bolid/AddCoolMetersBolid";
import AddHotMeterBolid from "./addMeters/bolid/AddHotMeterBolid";
import AddMeterCoolHotBolid from "./addMeters/bolid/AddMeterCoolHotBolid";
import AddCoolMeterPulsar from "./addMeters/pulsar/AddCoolMeterPulsar";
import SettingsBolid from "./settings/SettingsBolid";
import TestMainWaterPage from "./testMeters/testWater/view/TestMainWaterPage";

import { useAppSelector } from "../shared/hooks";
import MainPageUsers from "./admin/users/views/MainPageUsers";
import FormHousePage from "./formHouse/view/FormHousePage";
import MainKdlInObject from "./kdlInObject/view/MainKdlInObject";
import SettingsUp from "./testMeters/settingsUp/view/SettingsUp";
import TestMainElectricalPage from "./testMeters/testElectrical/view/TestMainElectricalPage";
import TestMainHeatPage from "./testMeters/testHeat/view/TestMainHeatPage";

const AppRouter = () => {
    const { isAuth } = useAppSelector((state) => state.user);

    return (
        <Routes>
            {isAuth ? (
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="object/:id" element={<DescriptionObject />}>
                        <Route
                            index
                            path="description"
                            element={<Description />}
                        />
                        <Route path="settings" element={<SettingsBolid />} />
                        <Route
                            path="addCoolMeterBolid"
                            element={<AddCoolMetersBolid />}
                        />
                        <Route
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
                        <Route path="settingsUp" element={<SettingsUp />} />
                    </Route>
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
