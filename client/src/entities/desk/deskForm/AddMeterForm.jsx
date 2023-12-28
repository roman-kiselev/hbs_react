import { Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { metersApi } from "../../../shared/api/meters";
import { useNumber } from "../../../shared/hooks";

const AddMeterForm = () => {
    const { id: objectBuildId } = useParams();
    const [numberFinded, numberFindedSet, changedNumberFinded] = useNumber("");

    const { data, isLoading } = metersApi.useFindByNumberQuery({
        number: numberFinded,
        objectBuildId,
    });

    const changeAndFind = (e) => {};

    return (
        <Row>
            <Col>
                <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Номер счётчика"
                    value={numberFinded}
                    onChange={(e) => changedNumberFinded(e)}
                />
            </Col>
            {/* <Col md="auto">
                <Spinner />
            </Col>
            <Col>
                <Button variant="primary" onClick={() => {}} size="sm">
                    Добавить
                </Button>
            </Col> */}
        </Row>
    );
};

export default AddMeterForm;
