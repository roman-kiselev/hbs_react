import { Row } from "react-bootstrap";
import AddMeterForm from "./deskForm/AddMeterForm";
import DeskTable from "./deskTable/DeskTable";
import FindedList from "./list/FindedList";

const Desk = () => {
    return (
        <Row>
            <Row>
                <AddMeterForm />
            </Row>
            <Row className="mt-3">
                <FindedList />
            </Row>
            <Row className="mt-3">
                <DeskTable />
            </Row>
        </Row>
    );
};

export default Desk;
