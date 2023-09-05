import { Row } from "react-bootstrap";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import TestFormCoolHotMeterBolid from "../../../../components/testMeters/testWater/form/TestFormCoolHotMeterBolid";
import ListMeterWater from "../../../../components/testMeters/testWater/listMeters/ListMeterWater";
import OperationsWater from "../../../../components/testMeters/testWater/operation/OperationsWater";
import { buttonGroupConfigWater } from "../../../../shared/config";
import { ButtonGroupCol } from "../../../../shared/ui";

const NewOldWaterRouter = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <>
            <Row>
                <ButtonGroupCol config={buttonGroupConfigWater} />
            </Row>
            <Routes>
                {/* <Route index element={<TestLink />} /> */}
                {/* <Route path="addMeters" element={<AddMeter />} /> */}
                <Route
                    path="addMeters"
                    element={<TestFormCoolHotMeterBolid id={id} />}
                />
                <Route path="listCard" element={<ListMeterWater id={id} />} />
                <Route path="operation" element={<OperationsWater id={id} />} />
            </Routes>
            <Row style={{ marginTop: 10 }}>
                <Outlet />
            </Row>
        </>
    );
};

export default NewOldWaterRouter;
