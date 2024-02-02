import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeskTableShort from "../../../entities/desk/deskTable/DeskTableShort";
import { metersApi } from "../../../shared/api/meters";
import { setInvalidHeat } from "../../../shared/models/deskAuto/DeskAutoSlice";

const InvalidHeat = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { list, number } = useSelector((store) => store.deskAuto.invalidHeat);

    const {
        data: listDesk,
        isLoading,
        refetch,
    } = metersApi.useGetInvalidHeatMetersQuery({
        number: number,
        objectBuildId: id,
    });

    const handleChangeNumber = (e) => {
        dispatch(setInvalidHeat(e.target.value));
    };

    const handleClick = () => {
        refetch();
    };

    return (
        <div>
            <Row>
                <Col>
                    <Form.Control
                        size="sm"
                        type="number"
                        placeholder="Количество цифр"
                        value={number}
                        onChange={(e) => handleChangeNumber(e)}
                    />
                </Col>
                <Col>
                    <Button onClick={() => handleClick()}>Получить</Button>
                </Col>
            </Row>
            <>
                {isLoading ? (
                    <Spinner animation="border" />
                ) : (
                    <>
                        {list && list.length > 0 ? (
                            <DeskTableShort
                                listDesk={list}
                                isLoading={isLoading}
                                refetch={refetch}
                            />
                        ) : (
                            <h1>Нет недопустимых счетчиков тепла</h1>
                        )}
                    </>
                )}
            </>
        </div>
    );
};

export default InvalidHeat;
