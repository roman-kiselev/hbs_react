import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TestFormCoolHotMeterBolid from "./forms/TestFormCoolHotMeterBolid";

const CreateWaterMeters = () => {
    const { id } = useParams();
    // console.log(id);
    // const arr = useLiveQuery(() =>
    //     mainTableDb.mainTable
    //         .where("objectBuildId")
    //         .equals(id.toString() ? id.toString() : 0)

    //         // .where("typeMeter")
    //         // .equals()
    //         .toArray()
    // );

    return (
        <Container>
            <Row>
                <TestFormCoolHotMeterBolid />
            </Row>
            {/* <Row className="mt-3">
                <ListOffline arr={arr} />
            </Row> */}
        </Container>
    );
};

export default CreateWaterMeters;
