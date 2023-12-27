import { Button, Form, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

const DeskTable = () => {
    return (
        <Table striped bordered hover responsive style={{ fontSize: 12 }}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Дом</th>
                    <th>Секция</th>
                    <th>Этаж</th>
                    <th>№</th>
                    <th>Статус</th>
                    <th>Ред</th>
                    <th>Удаление</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Лугометрия 12</td>
                    <td>5</td>
                    <td>6</td>
                    <td>123456789</td>
                    <td>
                        <Form.Select size="sm">
                            <option>Small select</option>
                        </Form.Select>
                    </td>
                    <td>
                        <Button variant="primary" onClick={() => {}} size="sm">
                            Edit
                        </Button>
                    </td>
                    <td>
                        <AiFillDelete
                            size={30}
                            color="red"
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {}}
                        />
                    </td>
                </tr>
                <tr style={{ backgroundColor: "green" }}>
                    <td>1</td>
                    <td>Лугометрия 12</td>
                    <td>5</td>
                    <td>6</td>
                    <td>123456789</td>
                    <td>
                        <Form.Select size="sm" disabled={true}>
                            <option>Small select</option>
                        </Form.Select>
                    </td>
                    <td>
                        <Button variant="primary" onClick={() => {}} size="sm">
                            Edit
                        </Button>
                    </td>
                    <td>
                        <AiFillDelete
                            size={30}
                            color="red"
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {}}
                        />
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Лугометрия 12</td>
                    <td>5</td>
                    <td>6</td>
                    <td>123456789</td>
                    <td>
                        <Form.Select size="sm">
                            <option>Small select</option>
                        </Form.Select>
                    </td>
                    <td>
                        <Button variant="primary" onClick={() => {}} size="sm">
                            Edit
                        </Button>
                    </td>
                    <td>
                        <AiFillDelete
                            size={30}
                            color="red"
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {}}
                        />
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Лугометрия 12</td>
                    <td>5</td>
                    <td>6</td>
                    <td>123456789</td>
                    <td>
                        <Form.Select size="sm">
                            <option>Small select</option>
                        </Form.Select>
                    </td>
                    <td>
                        <Button variant="primary" onClick={() => {}} size="sm">
                            Edit
                        </Button>
                    </td>
                    <td>
                        <AiFillDelete
                            size={30}
                            color="red"
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {}}
                        />
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Лугометрия 12</td>
                    <td>5</td>
                    <td>6</td>
                    <td>123456789</td>
                    <td>
                        <Form.Select size="sm">
                            <option>Small select</option>
                        </Form.Select>
                    </td>
                    <td>
                        <Button variant="primary" onClick={() => {}} size="sm">
                            Edit
                        </Button>
                    </td>
                    <td>
                        <AiFillDelete
                            size={30}
                            color="red"
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {}}
                        />
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Лугометрия 12</td>
                    <td>5</td>
                    <td>6</td>
                    <td>123456789</td>
                    <td>
                        <Form.Select size="sm">
                            <option>Small select</option>
                        </Form.Select>
                    </td>
                    <td>
                        <Button variant="primary" onClick={() => {}} size="sm">
                            Edit
                        </Button>
                    </td>
                    <td>
                        <AiFillDelete
                            size={30}
                            color="red"
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {}}
                        />
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};

export default DeskTable;
