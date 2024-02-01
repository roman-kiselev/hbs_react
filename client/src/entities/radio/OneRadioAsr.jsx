import { Button, Col, Row } from "react-bootstrap";

const getColor = (item) => {
    if (item.status === null) {
        return "lightgray";
    } else if (item.status === 1) {
        return "#90EE90";
    } else if (item.status === 0) {
        return "#FFFF8F";
    }
};

const OneRadioAsr = ({ item, handleShow, handleShowStatus }) => {
    return (
        <Col
            xs={5}
            style={{
                border: "1px lightgrey solid",
                margin: 10,
                borderRadius: 10,
                height: "130px",
                backgroundColor: getColor(item),
            }}
        >
            <Row style={{ justifyContent: "center", height: "100%" }}>
                <Col
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        style={{ width: "100%", heigth: "100%" }}
                        variant="primary"
                        onClick={() => handleShowStatus(item.meter[0])}
                    >
                        Ст. {item.line}. Кв.{item.meter[0].flat}
                    </Button>
                </Col>

                <Row
                    style={{
                        borderRadius: 10,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        xs={5}
                    >
                        <Button
                            variant="info"
                            onClick={() => handleShow(item.meter[0])}
                        >
                            {item.meter[0].numberAsr}
                        </Button>
                    </Col>
                    <Col
                        xs={5}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            variant="danger"
                            onClick={() => handleShow(item.meter[1])}
                        >
                            {item.meter[1].numberAsr}
                        </Button>
                    </Col>
                </Row>
            </Row>
        </Col>
    );
};

export default OneRadioAsr;
