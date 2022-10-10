import React from 'react'
import { Container, Card, Button, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ADD_HOT_METER } from '../utils/consts';

const OneObject = () => {

  const navigate = useNavigate()


  return (
    <Container>
      <Row style={{display: "flex", justifyContent: "center"}}>
      <Card style={{ width: '18rem', margin: "10px" }}>
        <Card.Body>
          <Card.Title>Счётчики горячей воды</Card.Title>
          <Card.Text>
            Добавление только счётчиков горячей воды
          </Card.Text>
          <Button variant="primary" onClick={() => navigate(ADD_HOT_METER)}>Вперёд</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: "10px" }}>
        <Card.Body>
          <Card.Title>Счётчики холодной воды</Card.Title>
          <Card.Text>
            Добавление только счётчиков холодной воды
          </Card.Text>
          <Button variant="primary">Вперёд</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: "10px" }}>
        <Card.Body>
          <Card.Title>Счётчики холодной и горячей воды</Card.Title>
          <Card.Text>
            Добавление только счётчиков холодной и горячей воды
          </Card.Text>
          <Button variant="primary">Вперёд</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: "10px" }}>
        <Card.Body>
          <Card.Title>Счётчики тепла</Card.Title>
          <Card.Text>
            Добавление только счётчиков тепла
          </Card.Text>
          <Button variant="primary">Вперёд</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: "10px" }}>
        <Card.Body>
          <Card.Title>Счётчики электроэнергии</Card.Title>
          <Card.Text>
            Добавление только счётчиков электроэнергии
          </Card.Text>
          <Button variant="primary">Вперёд</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: "10px" }}>
        <Card.Body>
          <Card.Title>Любой прибор</Card.Title>
          <Card.Text>
            Добавить любой прибор
          </Card.Text>
          <Button variant="primary">Вперёд</Button>
        </Card.Body>
      </Card>
      </Row>
    </Container>

  )
}

export default OneObject;
