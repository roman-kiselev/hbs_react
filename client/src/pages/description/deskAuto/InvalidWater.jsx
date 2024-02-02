import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeskTableShort from "../../../entities/desk/deskTable/DeskTableShort";
import { metersApi } from "../../../shared/api/meters";
import { setInvalidWater } from "../../../shared/models/deskAuto/DeskAutoSlice";

const InvalidWater = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { list, number } = useSelector(
        (store) => store.deskAuto.invalidWater
    );

    const {
        data: listDesk,
        isLoading,
        refetch,
    } = metersApi.useGetInvalidWaterMetersQuery({
        number: number,
        objectBuildId: id,
    });

    const handleChangeNumber = (e) => {
        dispatch(setInvalidWater(e.target.value));
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
                            <h1>Нет недопустимых счетчиков воды</h1>
                        )}
                    </>
                )}
            </>
        </div>
    );
};

export default InvalidWater;
