import { Button, Col, Form, Row, Spinner } from "react-bootstrap";

const AddMeterForm = () => {
    return (
        <Row>
            <Col>
                <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Номер счётчика"
                />
            </Col>
            <Col md="auto">
                <Spinner />
            </Col>
            <Col>
                <Button variant="primary" onClick={() => {}} size="sm">
                    Добавить
                </Button>
            </Col>
        </Row>
    );
};

export default AddMeterForm;
