import React from "react";
import { Form, Row } from "react-bootstrap";

const Comment = () => {
    return (
        <Row>
            <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
            >
                <Form.Label>Комментарий</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={""}
                    onChange={() => {}}
                />
            </Form.Group>
        </Row>
    );
};

export default Comment;
