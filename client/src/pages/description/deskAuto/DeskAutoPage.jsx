import { Accordion } from "react-bootstrap";
import InvalidElectical from "./InvalidElectical";
import InvalidHeat from "./InvalidHeat";
import InvalidWater from "./InvalidWater";
import RepeatingNumbers from "./RepeatingNumbers";

const DeskAutoPage = () => {
    return (
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Счётчики воды</Accordion.Header>
                    <Accordion.Body>
                        <InvalidWater />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Счётчики тепла</Accordion.Header>
                    <Accordion.Body>
                        <InvalidHeat />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Счётчики электроэнергии</Accordion.Header>
                    <Accordion.Body>
                        <InvalidElectical />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Номера повторяются</Accordion.Header>
                    <Accordion.Body>
                        <RepeatingNumbers />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default DeskAutoPage;
