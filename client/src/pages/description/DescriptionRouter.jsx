import { Route, Routes } from "react-router-dom";
import DescriptionObject from "../DescriptionObject";
import { DeskPage } from "./desk";
import { ElectricalRouter } from "./electrical";
import { HeatRouter } from "./heat";
import { WaterRouter } from "./water";

const DescriptionRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<DescriptionObject />}>
                <Route path="water/*" element={<WaterRouter />} />
                <Route path="heat/*" element={<HeatRouter />} />
                <Route path="electrical/*" element={<ElectricalRouter />} />
                <Route path="desk/*" element={<DeskPage />} />
            </Route>
        </Routes>
    );
};

export default DescriptionRouter;
