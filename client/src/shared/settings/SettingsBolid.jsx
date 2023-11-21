import { useState } from "react";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import AddFlat from "../ui/modals/settings/AddFlat";
import AddFloors from "../ui/modals/settings/AddFloors";
import AddLine from "../ui/modals/settings/AddLine";
import AddOffice from "../ui/modals/settings/AddOffice";
import AddSections from "../ui/modals/settings/AddSections";

const SettingsBolid = () => {
    const [sectionsShow, setSectionsShow] = useState(false);
    const sectionsHandleClose = () => setSectionsShow(false);
    const sectionsHandleShow = () => setSectionsShow(true);

    const [lineShow, setLineShow] = useState(false);
    const lineHandleClose = () => setLineShow(false);
    const lineHandleShow = () => setLineShow(true);

    const [flatShow, setFlatShow] = useState(false);
    const flatHandleClose = () => setFlatShow(false);
    const flatHandleShow = () => setFlatShow(true);

    const [floorsShow, setFloorsShow] = useState(false);
    const floorsHandleClose = () => setFloorsShow(false);
    const floorsHandleShow = () => setFloorsShow(true);

    const [officeShow, setOfficeShow] = useState(false);
    const officeHandleClose = () => setOfficeShow(false);
    const officeHandleShow = () => setOfficeShow(true);

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="objects">Объекты</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Приборы болид</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="flat">Квартиры</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="objects">
                            <Row>
                                <Row>
                                    <Col>
                                        <Button
                                            variant="primary"
                                            onClick={sectionsHandleShow}
                                        >
                                            Добавить секции
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            variant="primary"
                                            onClick={lineHandleShow}
                                        >
                                            Добавить линии
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            variant="primary"
                                            onClick={floorsHandleShow}
                                        >
                                            Добавить этажи
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            variant="primary"
                                            onClick={flatHandleShow}
                                        >
                                            Добавить квартиры
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            variant="primary"
                                            onClick={officeHandleShow}
                                        >
                                            Добавить офисы
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="mt-3">dgdsdgsdfhs</Row>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">Добавить</Tab.Pane>
                        <Tab.Pane eventKey="flat">3</Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
            <Row>
                <>
                    <AddSections
                        show={sectionsShow}
                        onHide={() => sectionsHandleClose()}
                    />
                    <AddLine show={lineShow} onHide={() => lineHandleClose()} />
                    <AddFlat show={flatShow} onHide={() => flatHandleClose()} />
                    <AddFloors
                        show={floorsShow}
                        onHide={() => floorsHandleClose()}
                    />
                    <AddOffice
                        show={officeShow}
                        onHide={() => officeHandleClose()}
                    />
                </>
            </Row>
        </Tab.Container>
    );
};

export default SettingsBolid;
