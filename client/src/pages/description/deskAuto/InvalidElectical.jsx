import { Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeskTableShort from "../../../entities/desk/deskTable/DeskTableShort";
import { metersApi } from "../../../shared/api/meters";
import { setInvalidElectrical } from "../../../shared/models/deskAuto/DeskAutoSlice";

const InvalidElectical = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { list, number } = useSelector(
        (store) => store.deskAuto.invalidElectrical
    );

    const {
        data: listDesk,
        isLoading,
        refetch,
    } = metersApi.useGetInvalidElectricalMetersQuery({
        number: number,
        objectBuildId: id,
    });

    const handleChangeNumber = (e) => {
        dispatch(setInvalidElectrical(e.target.value));
        refetch();
    };

    return (
        <div>
            <Row>
                <Form.Control
                    size="sm"
                    type="number"
                    placeholder="Количество цифр"
                    value={number}
                    onChange={(e) => handleChangeNumber(e)}
                />
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
                            <h1>Нет недопустимых счетчиков электроэнергии</h1>
                        )}
                    </>
                )}
            </>
        </div>
    );
};

export default InvalidElectical;
