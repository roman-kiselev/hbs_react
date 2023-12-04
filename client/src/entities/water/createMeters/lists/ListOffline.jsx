import { Badge, Button, Row, Table } from "react-bootstrap";

const ListOffline = ({ arr }) => {
    return (
        <Row>
            <Row></Row>
            <Row>
                <Table
                    style={{ fontSize: 13 }}
                    size="sm"
                    striped
                    bordered
                    hover
                >
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Кв.</th>
                            <th>Канал</th>
                            <th>Номера</th>
                            <th>Статус</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr?.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.flat}</td>
                                <td>
                                    {item.numberKdl}/{item.numberAsr}
                                </td>
                                <td>{item.numberMeter}</td>
                                <td>
                                    <Badge
                                        bg={
                                            item.isDevice
                                                ? "warning"
                                                : "success"
                                        }
                                        text={item.isDevice ? "dark" : "light"}
                                    >
                                        {item.isDevice
                                            ? "В телефоне"
                                            : "На сервере"}
                                    </Badge>
                                </td>
                                <td>
                                    <Button variant="primary" size="sm">
                                        Открыть
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {/* <tr>
                    <td>1</td>
                    <td>101</td>
                    <td>1</td>
                    <td style={{ margin: 0, padding: 0 }}>
                        <p style={{ margin: 0, padding: 0 }}>54353453</p>
                        <p style={{ margin: 0, padding: 0 }}>54353453</p>
                    </td>
                    <td>
                        <Badge bg="warning" text="dark" pill={true}>
                            В телефоне
                        </Badge>
                    </td>
                    <td>
                        <Button variant="primary" size="sm">
                            Открыть
                        </Button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>102</td>
                    <td>1/13</td>
                    <td style={{ margin: 0, padding: 0 }}>
                        <p style={{ margin: 0, padding: 0 }}>54353453</p>
                        <p style={{ margin: 0, padding: 0 }}>54353453</p>
                    </td>
                    <td>
                        <Badge pill bg="success">
                            На сервере
                        </Badge>
                    </td>
                    <td>
                        <Button variant="primary" size="sm">
                            Открыть
                        </Button>
                    </td>
                </tr> */}
                    </tbody>
                </Table>
            </Row>
        </Row>
    );
};

export default ListOffline;
