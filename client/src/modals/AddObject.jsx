import React, { useState } from 'react';

import {Modal, Form, Button} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addObject } from "../features/objectBuild/objectBuildSlice";

import { v4 as uuidv4 } from 'uuid';


const AddObject = ({show, onHide}) => {

    const dispatch = useDispatch()

    const [nameObject, setNameObject] = useState('');
    const [addressObject, setAddressObject] = useState('');

    const addObjectHandler = () => {
        const arrObject = {
            id: uuidv4(),
            name: nameObject,
            address: addressObject
        }

        dispatch(addObject(arrObject))
        console.log(arrObject)
        setAddressObject('')
        setNameObject('')
    }

    const addNewObjectBuild = () => {
        addObjectHandler()
        onHide()
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
                            type="email"
                            placeholder="Новые сады"
                            value={nameObject}
                            autoFocus
                            onChange={(e) => setNameObject(e.target.value)}
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
                <Button variant="primary" onClick={() => addNewObjectBuild()}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddObject;