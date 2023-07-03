import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { setDescription, setName, setImg } from "../../../shared/models";

interface IModalBodyAddObject {
    setStateFile: React.Dispatch<React.SetStateAction<File>>;
}

const ModalBodyAddObject: React.FC<IModalBodyAddObject> = ({
    setStateFile,
}) => {
    const dispatch = useAppDispatch();

    const { name, description } = useAppSelector((store) => store.createObject);
    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setName(e.target.value));
    };
    const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setDescription(e.target.value));
    };
    const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0].name;
        setStateFile(e.target.files[0]);
        dispatch(setImg(file));
    };

    return (
        <>
            <Form>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Label>Введите наименование</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Новые сады"
                        value={name}
                        autoFocus
                        onChange={handleChangeName}
                    />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Выбор изображения</Form.Label>
                    <Form.Control type="file" onChange={handleChangeImg} />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Описание или Адрес</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={handleChangeDescription}
                    />
                </Form.Group>
            </Form>
        </>
    );
};

export default ModalBodyAddObject;
