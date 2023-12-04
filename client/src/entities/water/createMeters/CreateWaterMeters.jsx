import { useLiveQuery } from "dexie-react-hooks";
import { Container, Row } from "react-bootstrap";
import { mainTableDb } from "../../../shared/db";
import TestFormCoolHotMeterBolid from "./forms/TestFormCoolHotMeterBolid";
import ListOffline from "./lists/ListOffline";

const CreateWaterMeters = () => {
    const arr = useLiveQuery(() =>
        mainTableDb.mainTable
            .where("typeMeter")
            .equals("Счётчик холодной воды")
            .or("typeMeter")
            .equals("Счётчик горячей воды")
            .toArray()
    );

    return (
        <Container>
            <Row>
                <TestFormCoolHotMeterBolid />
            </Row>
            <Row className="mt-3">
                <ListOffline arr={arr} />
            </Row>
        </Container>
    );
};

export default CreateWaterMeters;
