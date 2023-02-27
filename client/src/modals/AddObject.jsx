import React, { useState } from 'react';

import {Modal, Form, Button} from "react-bootstrap";
import { useDispatch } from "react-redux";
import {addObject, createObjects} from "../features/objectBuild/objectBuildSlice";

import { v4 as uuidv4 } from 'uuid';


const AddObject = ({show, onHide}) => {

    const dispatch = useDispatch()

    const [nameObject, setNameObject] = useState('');
    const [addressObject, setAddressObject] = useState('');
    const [img, setImg] = useState(null)


    const addHome = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", nameObject)
        formData.append("img", img)
        formData.append("description", addressObject)

        dispatch(createObjects({formData})).then((data) => onHide())
    }

    const selectFile = (e) => {
        setImg(e.target.files[0])
    }


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Новый объект</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Введите наименование</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Новые сады"
                            value={nameObject}
                            autoFocus
                            onChange={(e) => setNameObject(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Выбор изображения</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => selectFile(e)}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"

                    >
                        <Form.Label>Описание или Адрес</Form.Label>
                        <Form.Control as="textarea" rows={3} 
                        value={addressObject}
                        onChange={(e) => setAddressObject(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={(e) => addHome(e)}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddObject;