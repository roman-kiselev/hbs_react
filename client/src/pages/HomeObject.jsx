import { React , useState} from 'react';
import Container from "react-bootstrap/Container";
import { Row, Button } from "react-bootstrap";
import CardObjects from "../components/CardObjects";
import AddObject from "../modals/AddObject";
import { useSelector } from 'react-redux';

const HomeObject = () => {

    
    const [newObj, setNewObj] = useState(false)

    const objects = useSelector((state) => state.objectBuilds.objectsBuild)

    return (
        <Container>
            <Row className="mt-3" style={{justifyContent: "center"}}>

                <Button variant="primary" size="lg"
                    onClick={() => setNewObj(true)}

                >
                    Добавить новый объект
                </Button>
                <AddObject show={newObj} onHide={ () => setNewObj(false)}/>


                {objects.map((item) => (
                    <CardObjects key={item.id} {...item}/>
                ))}
            </Row>

        </Container>
    );
};

export default HomeObject;