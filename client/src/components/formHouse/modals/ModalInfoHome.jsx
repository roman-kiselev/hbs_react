import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setFormHouse } from "../../../shared/models/formHouse/formHouseSlice";
import RowSectionAndFloor from "../form/formForModal/RowSectionAndFloor";

// Сделаем state для формирования этажей
// Формируется путём формирования из числа массива
// Фунция возвращает массив
const getArrSections = (sections) => {
    const arrSections = [];
    for (let i = 1; i <= sections; i++) {
        arrSections.push({
            numberSection: i,
            sumFloors: 0,
            lines: 0,
            typeAsr: ["ASR2", "ASR8"],
            active: false,
        });
    }
    return arrSections;
};

const ModalInfoHome = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const [sections, setSections] = useState("");
    const { formHouse } = useSelector((state) => state.formHouse);
    const [arrSections, setArrSections] = useState([]);
    // При изменении section присваиваем массив в arrSections
    const handleChangeSections = (e) => {
        setSections(e.target.value);
        setArrSections(getArrSections(e.target.value));
    };

    const handleSectionChange = (sectionIndex, newSumFloors) => {
        // Принимаем из вложенного компонента index значения в массиве и присваиваем его новое значение
        const newSections = [...arrSections];
        newSections[sectionIndex].sumFloors = newSumFloors;
        setArrSections(newSections);
    };
    const handleLinesChange = (sectionIndex, newLines) => {
        const newSections = [...arrSections];
        newSections[sectionIndex].lines = newLines;
        setArrSections(newSections);
    };

    // Сохраняем данные в store
    const handleSave = () => {
        dispatch(setFormHouse(arrSections));
        handleClose();
    };

    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Начальные параметры</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Секций</Form.Label>
                            <Form.Control
                                type="number"
                                value={sections}
                                onChange={(e) => handleChangeSections(e)}
                            />
                        </Form.Group>
                    </Row>
                    {/* отрисовываем количество секций в зависимости от количество секций */}
                    <Row>
                        {sections === "" ? (
                            <></>
                        ) : (
                            arrSections.map((item, index) => (
                                <RowSectionAndFloor
                                    key={index}
                                    item={item}
                                    index={index}
                                    handleSectionChange={handleSectionChange}
                                    handleLinesChange={handleLinesChange}
                                />
                            ))
                        )}
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalInfoHome;
