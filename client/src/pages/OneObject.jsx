import React from 'react'
import { Container, Card, Button, Row } from 'react-bootstrap';

const OneObject = () => {
  return (
    <Container>
      <Row style={{display: "flex", justifyContent: "center"}}>
      <Card style={{ width: '18rem', margin: "10px" }}>
        <Card.Body>
          <Card.Title>Счётчики горячей воды</Card.Title>
          <Card.Text>
            Добавление только счётчиков горячей воды
          </Card.Text>
          <Button variant="primary">Вперёд</Button>
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
      </Row>
    </Container>

  )
}

export default OneObject;
