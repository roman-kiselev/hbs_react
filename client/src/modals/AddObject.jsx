import React from 'react';

import {Modal, Form, Button} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addObject } from "../features/objectBuild/objectBuildSlice";
import { v4 as uuidv4 } from 'uuid';


const AddObject = ({show, onHide}) => {

    const dispatch = useDispatch()

    const addObjectHandler = () => {
        const arrObject = {
            id: v4(),
            name: "",
            address: ""
        }
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
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Описание или Адрес</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={onHide}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddObject;