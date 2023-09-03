import { Row } from "react-bootstrap";
import { Outlet, Route, Routes } from "react-router-dom";
import { buttonGroupConfigWater } from "../../../../shared/config";
import { ButtonGroupCol } from "../../../../shared/ui";
import AddMeter from "./AddMeter";
import { default as ListCardMeter } from "./ListCardMeter";
import Operation from "./Operation";

const NewOldWaterRouter = () => {
    return (
        <>
            <Row>
                <ButtonGroupCol config={buttonGroupConfigWater} />
            </Row>
            <Routes>
                {/* <Route index element={<TestLink />} /> */}
                <Route path="addMeters" element={<AddMeter />} />
                <Route path="listCard" element={<ListCardMeter />} />
                <Route path="operation" element={<Operation />} />
            </Routes>
            <Outlet />
        </>
    );
};

export default NewOldWaterRouter;
