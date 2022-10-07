import React from 'react'
import { Container, Row, Button, Col } from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import { OBJECT_BUILD_ROUTE } from '../utils/consts'

const HomePage = () => {

  const navigate = useNavigate()

  return (
    <Container style={{display: "flex"}}>
      <Row className="mx-auto" style={{display: "flex", justifyContent: "center", marginTop: "25%"}}>
        <Col style={{display: "flex"}}>
          <Button variant="primary" onClick={() => navigate(OBJECT_BUILD_ROUTE)}>Объекты</Button>
        </Col>
        <Col>
          <Button variant="secondary">Администрирование</Button>
        </Col>
        <Col>
          <Button variant="success">Что то</Button>
        </Col>
        <Col>
          <Button variant="warning">Что то</Button>
        </Col>
        <Col>
          <Button variant="danger">Что то</Button>
        </Col>
        
      </Row>
    </Container>
  )
}

export default HomePage;
