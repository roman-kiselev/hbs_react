import { useEffect } from "react";
import { Button, Form, Modal, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllSections } from "../../../models/objectBuild/sectionsSlice";
import Pages from "../../pagination/Pages";
import RowTable from "./sections/RowTable";

const AddSections = ({ show, onHide }) => {
    const dispatch = useDispatch();
    const limit = 4;
    const offset = 3;

    const sections = useSelector((state) => state.sections.sections);
    const count = useSelector((state) => state.sections.count);

    useEffect(() => {
        dispatch(getAllSections({ limit: 4, offset: 4 }));
    }, []);

    let pageCount = Math.ceil(count / limit);
    let pages = [];

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новую секцию</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Номер секции</Form.Label>
                        <Form.Control type="number" autoFocus />
                    </Form.Group>
                    <Button variant="success">Добавить</Button>
                </Form>
                <Row className="mt-2">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Номер</th>
                                <th>Функция</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.length > 0 ? (
                                sections.map((section) => (
                                    <RowTable
                                        key={section.id}
                                        section={section}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row>
                <Row className="justify-content-center">
                    <Pages />
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={onHide}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddSections;
