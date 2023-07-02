import React from "react";
import { Row, Form, Col, Button } from "react-bootstrap";

interface IFormRowsOneUserProps {
    children: React.ReactNode;
    // Добавляем тип onClick
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FormRowsOneUser: React.FC<IFormRowsOneUserProps> = ({
    children,
    onClick,
}) => {
    return (
        <>
            <Form>
                {children}

                <Row className="mt-3">
                    <Col sm={3}>
                        <Button variant="primary" type="submit">
                            Сохранить
                        </Button>
                    </Col>
                    <Col sm={3}>
                        <Button variant="danger" onClick={onClick}>
                            Удалить Пользователя
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default FormRowsOneUser;
