import { React , useState} from 'react';
import Container from "react-bootstrap/Container";
import { Row, Card, Button } from "react-bootstrap";
import CardObjects from "../components/CardObjects";
import AddObject from "../modals/AddObject";

const HomeObject = () => {

    const [itemsObject, setItemsObject] = useState([
        {id: 1, name: "Новые сады"},
        {id: 2, name: "Новые сады"},
        {id: 3, name: "Новые сады"},
        {id: 4, name: "Новые сады"},
        {id: 5, name: "Новые сады"}
    ])

    const [newObj, setNewObj] = useState(false)

    return (
        <Container>
            <Row className="mt-3" style={{justifyContent: "center"}}>

                <Button variant="primary" size="lg"
                    onClick={() => setNewObj(true)}

                >
                    Добавить новый объект
                </Button>
                <AddObject show={newObj} onHide={ () => setNewObj(false)}/>


                {itemsObject.map((item) => (
                    <CardObjects key={item.id} {...item}/>
                ))}
            </Row>

        </Container>
    );
};

export default HomeObject;