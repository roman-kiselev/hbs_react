import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import {
    getAllMetersForOffline,
    sendAllMetersForOffline,
} from "../../../../http/heatMeterApi";
import { useAppSelector } from "../../../../shared/hooks";
import CardCreateMeter from "../../../repeat/modals/CardCreateMeter";
import dbHeat from "../db/dbHeat";
import { addAllDataInDb } from "../db/service/addAllDataInDb";
import addMeter from "../db/service/addMeters";
import { delDbAndClose } from "../db/service/delDb";
import editRecordById from "../db/service/editRecordById";
import SectionPagination from "./helpers/SectionPagination";
import TableOffline from "./table/TableOffline";

//Добавляем все счётчики из БД
const getWaterMeters = async (idObject, dataOld) => {
    try {
        const { table } = await getAllMetersForOffline(idObject);
        if (table) {
            delDbAndClose().then(async () => {
                await addAllDataInDb(table);
            });
        }
        // if (dataOld !== undefined && table !== undefined) {
        //     setState((dataOld) => {
        //         table.map((d) => (d.id === dataOld.id ? dataOld : d));
        //     });
        // }
    } catch (e) {
        console.log(e);
    }
};

// Функция получает массив
// Перебирает его и добавляет новую секцию в массив секций
// Возвращает массив отсортированный
const getSection = (data) => {
    if (data === undefined) {
        return [];
    }
    if (data.length === 1) {
        const newArr = data.map((d) => {
            return d.section;
        });
        return newArr;
    }

    const newArr = data.map((d) => {
        return Number(d.section);
    });

    const uniqArr = newArr.filter((number, item) => {
        return newArr.indexOf(number) === item;
    });

    return uniqArr.sort((a, b) => a - b);
};
// Функция примает массив и номер секции
// Возвращает массив отсортированный по номеру секции
const getRowsBySection = (data, section) => {
    if (data === undefined) {
        return [];
    }

    return data.filter((d) => Number(d.section) === section);
};

const FormOfflineHeat = ({ id }) => {
    const list = useLiveQuery(() => dbHeat.main.toArray());
    const [listMeters, setListMeters] = useState([]);
    const [listSection, setListSection] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    // Здесь список счётчиков по выбранной секции
    const [listSelectedSection, setListSelectedSection] = useState([]);
    useEffect(() => {
        setListMeters(list);
        setListSection(getSection(list));
        if (list !== undefined && list.length > 0) {
            if (list.length === 1) {
                setSelectedSection(list[0].section);
                setListSelectedSection(
                    getRowsBySection(list, Number(list[0].section))
                );
            } else {
                setSelectedSection(list);
                setListSelectedSection(
                    getRowsBySection(
                        list,
                        selectedSection || Number(list[0].section)
                    )
                );
            }
        }
    }, [list]);
    // Функция принимает setState и номер выбранной секции
    // При клике устанавливает новый state
    const handleClickAndSetState = (section) => {
        setSelectedSection(section);
        setListSelectedSection(getRowsBySection(listMeters, section));
    };

    // Модальное окно для добавления счётчика
    const { id: userId } = useAppSelector((state) => state.user.user);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClick = (
        data,
        hClose,
        setSection,
        setFloors,
        setFlat,
        setNumberMeter,
        setSumMeter,
        setLine,
        setComment
    ) => {
        const mainData = {
            ...data,
            objectBuildId: id,
            userId,
        };
        addMeter(mainData);
        setSection(0);
        setFloors(0);
        setFlat(0);
        setNumberMeter(0);
        setSumMeter(0);
        setLine(0);
        setComment("");

        hClose();
    };

    const handleUpdateMeter = (data, handleClose) => {
        console.log(data.id, data);
        editRecordById(data.id, data);
        handleClose();
    };
    // Отправляем данные на сервер
    const sendToServer = async () => {
        // Получаем все записи из базы данных
        const list = await dbHeat.main.toArray();
        const data = JSON.stringify(list);
        // Отправляем данные на сервер
        sendAllMetersForOffline(id, data);
    };

    return (
        <Container>
            <Row className="d-flex ">
                {/* <Col className="d-flex justify-content-center">
                    <Button variant="primary">Primary</Button>
                </Col> */}
                <Col className="d-flex justify-content-center">
                    <Button
                        variant="warning"
                        onClick={() => getWaterMeters(id)}
                    >
                        Синхронизировать для оффлайн
                    </Button>
                </Col>
                <Col className="d-flex justify-content-center mt-3">
                    <Button variant="success" onClick={() => sendToServer()}>
                        Отправить на сервер
                    </Button>
                </Col>
            </Row>

            <Row className="mt-3">
                <SectionPagination
                    listSection={listSection}
                    handleClickAndSetState={handleClickAndSetState}
                />
            </Row>
            <Row className="mt-3">
                <TableOffline
                    data={listSelectedSection}
                    handleUpdateMeter={handleUpdateMeter}
                />
            </Row>
            <Row className="mt-3">
                <Col className="d-flex justify-content-center">
                    <BsPlusCircleFill
                        cursor={"pointer"}
                        size={50}
                        color="green"
                        onClick={handleShow}
                    />
                </Col>
                <CardCreateMeter
                    show={show}
                    handleClose={handleClose}
                    id={id}
                    userId={userId}
                    handleClickForEdit={handleClick}
                />
            </Row>
        </Container>
    );
};

export default FormOfflineHeat;
