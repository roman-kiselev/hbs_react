import { Route, Routes } from "react-router-dom";
import MainPageUsers from "../components/admin/users/views/MainPageUsers";
import { useAppSelector } from "../shared/hooks";
import Auth from "./Auth";
//import DescriptionObject from "./DescriptionObject";
import HomePage from "./HomePage";
import Layout from "./Layout";
import AdminHomePage from "./admin/AdminHomePage";
import MainOneObject from "./mainOneObject";

const Routing = () => {
    const { isAuth, isLoading } = useAppSelector((state) => state.user);

    return (
        <Routes>
            {isAuth ? (
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="object/:id/*" element={<MainOneObject />} />
                    {/* <Route
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
                        <Route path="settingsUp" element={<SettingsUp />} /> */}
                    {/* </Route> */}
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

export default Routing;
