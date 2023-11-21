import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteWaterMeter } from "../../../../http/waterMeterApi";
import {
    getAllMetersByUserAndObject,
    getMetersByNumberFlat,
    getOneMeter,
    setCurrentPage,
} from "../../../../shared/models/testMeterWater/testWaterMeterSlice";
import ListMeters from "../../../../shared/ui/cards/ListMeters";
import Pages from "../../../../shared/ui/pagination/Pages";

const ListMeterWater = ({ id: objectBuildId }) => {
    const dispatch = useDispatch();
    const { id: userId } = useSelector((state) => state.users.user);
    // Получаем все счётчики
    const cardMeter = useSelector((state) => state.mainTable.mainTable);

    const [searchValue, setSearchValue] = useState("");
    const { currentPage, limit } = useSelector((state) => state.mainTable);
    const { perPage } = useSelector((state) => state.mainTable);
    const { totalCount } = useSelector((state) => state.mainTable);
    // Отслеживаем включения чекбокса
    // const [checked, setChecked] = useState(false);

    // Создаём объект для передачи данных для пагинации
    const paginationObject = {
        limit,
        currentPage,
        totalCount,
    };
    // Данные для запроса
    const formQuery = {
        userId,
        objectBuildId,
        limit,
        currentPage,
    };

    // Устанавливаем текущую страницу
    const handleClick = (page) => {
        dispatch(setCurrentPage(page));
    };
    // Функция для редактирования одного счётчика, передаётся в модальное окно
    const handleClickForEdit = (formData, formQuery, handleClose) => {
        try {
            dispatch(getOneMeter({ formData })).then((d) => {
                dispatch(getAllMetersByUserAndObject({ formQuery }));
                handleClose();
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handleSearch = (e) => {
        const numSearch = e.target.value;
        setSearchValue(numSearch);
        const formQuery = {
            userId,
            objectBuildId,
            limit,
            currentPage,
            num: numSearch,
        };

        dispatch(getMetersByNumberFlat({ formQuery }));
    };

    // Функция для удаления счётчика
    const handleClickDel = async (id) => {
        try {
            const confirmDelete = window.confirm(
                "Вы уверены что хотите удалить этот счётчик?"
            );
            if (confirmDelete) {
                await deleteWaterMeter({ id }).then((d) => {
                    dispatch(getAllMetersByUserAndObject({ formQuery }));
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    // // Функция при переключении check
    // const handleChangeCheck = (e) => {
    //     const check = e.target.checked;
    //     console.log(check);
    //     setChecked(check);
    //     dispatch(getAllMetersByUserAndObject({ formQuery }));
    // };

    // Получаем все счётчики
    useEffect(() => {
        dispatch(getAllMetersByUserAndObject({ formQuery }));
    }, [dispatch, currentPage]);

    return (
        <Row>
            <Row className="mt-3">
                <Col sm={5}>
                    <Form className="d-flex">
                        <Form.Control
                            type="number"
                            placeholder="Поиск квартиры"
                            className="me-2"
                            aria-label="Search"
                            value={searchValue}
                            onChange={(e) => handleSearch(e)}
                        />
                    </Form>
                </Col>
                <Col sm={3}>
                    {/* <Form>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Только мои"
                            checked={checked}
                            onChange={(e) => handleChangeCheck(e)}
                        />
                    </Form> */}
                </Col>
            </Row>
            <Row>
                <ListMeters
                    listCards={cardMeter}
                    objectId={objectBuildId}
                    handleClickForEdit={handleClickForEdit}
                    handleClickDel={handleClickDel}
                />
            </Row>
            <Row className="m-3 ">
                <Col>
                    <Pages {...paginationObject} clickAction={handleClick} />
                </Col>
            </Row>
        </Row>
    );
};

export default ListMeterWater;
