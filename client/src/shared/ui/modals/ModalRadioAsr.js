import { useRef, useState } from "react";
import { Badge, Button, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { statusRadioApi } from "../../api/statusRadio";

const getData = (date) => {
    const editDate = new Date(date);
    const newDate = `${editDate.getDate()}.${
        editDate.getMonth() + 1
    }.${editDate.getFullYear()}`;
    return newDate;
};

const ModalRadioAsr = ({
    showStatus,
    handleCloseStatus,
    dataForStatus,
    refetch,
}) => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState("null");
    const [signalState, setSignalState] = useState("");
    const [comment, setComment] = useState("");
    const { listMeterRadio } = useSelector((store) => store.water);
    const target = useRef(null);
    const [showComment, setShowComment] = useState(false);

    const data = {
        mainMeterId: dataForStatus.id,
        status,
        signal: signalState,
        comment: comment,
        objectBuildId: dataForStatus.objectBuildId,
    };

    const [
        createStatus,
        { data: dataNewStatus, isLoading: isLoadingNewStaus },
    ] = statusRadioApi.useCreateStatusMutation();

    const {
        data: currentStatus,
        isLoading: isLoadingCurrentStatus,
        refetch: reloadStatus,
    } = statusRadioApi.useGetCurrentStatusQuery({
        mainMeterId: dataForStatus.id,
    });

    const {
        data: lastArr,
        isLoading: isLoadingLastArr,
        refetch: reloadLastArr,
    } = statusRadioApi.useGetLastArrQuery({ mainMeterId: dataForStatus.id });

    const handleCreateStatus = () => {
        createStatus(data);
        reloadStatus();
        reloadLastArr();
        refetch();
    };

    return (
        <>
            <Modal
                show={showStatus}
                onHide={handleCloseStatus}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Ст.{dataForStatus.line}. Квартира №{dataForStatus.flat}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{ justifyContent: "center" }}>
                        <Row>
                            <Row>
                                <Form.Select
                                    defaultValue={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="null">Выбор статуса</option>
                                    <option value="1">Работает</option>
                                    <option value="0">Не работает</option>
                                </Form.Select>
                            </Row>
                            <Row>
                                <Form.Label>Сила сигнала</Form.Label>
                                <Form.Control
                                    type="number"
                                    onChange={(e) =>
                                        setSignalState(e.target.value)
                                    }
                                />
                            </Row>
                            <Row>
                                <Form.Label>Комментарий</Form.Label>
                                <Form.Control
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </Row>
                            <Row style={{ marginTop: 10 }}>
                                <Button
                                    onClick={() => handleCreateStatus()}
                                    variant="primary"
                                >
                                    Сохранить
                                </Button>
                            </Row>
                        </Row>
                        <Row
                            style={{
                                marginTop: 10,
                                borderTop: "1px lightgrey solid",
                            }}
                        >
                            <Row>
                                <h6>Последний статус</h6>

                                {currentStatus ? (
                                    <Badge bg="primary">
                                        {currentStatus.status
                                            ? "Работает"
                                            : "Не работает"}
                                        . {currentStatus.signalStatus} дБм.
                                        {getData(currentStatus.createdAt)}
                                    </Badge>
                                ) : null}
                            </Row>
                        </Row>
                        <Row
                            style={{
                                marginTop: 10,
                                borderTop: "1px lightgrey solid",
                            }}
                        >
                            <Row style={{ marginTop: 10 }}>
                                {lastArr ? (
                                    <>
                                        {lastArr.map((item, index) => (
                                            <Row
                                                style={{
                                                    border: "1px grey solid",
                                                    borderRadius: "15px",
                                                    margin: 2,
                                                }}
                                            >
                                                <Badge
                                                    key={item.id}
                                                    style={{ marginTop: 3 }}
                                                    bg="success"
                                                >
                                                    {index + 1}.{" "}
                                                    {item.status
                                                        ? "Работает"
                                                        : "Не работает"}
                                                    . {item.signalStatus} дБм.
                                                    {getData(item.createdAt)}
                                                </Badge>
                                                <div
                                                    style={{
                                                        wordWrap: "break-word",
                                                    }}
                                                >
                                                    <div>{item.comment}</div>
                                                </div>
                                            </Row>
                                        ))}
                                    </>
                                ) : null}
                            </Row>
                        </Row>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStatus}>
                        Выход
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalRadioAsr;
