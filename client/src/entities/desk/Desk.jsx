import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { deskApi } from "../../shared/api/desk";
import AddMeterForm from "./deskForm/AddMeterForm";
import DeskTable from "./deskTable/DeskTable";
import FindedList from "./list/FindedList";

const Desk = () => {
    const { id } = useParams();
    const { data } = deskApi.useGetAllQuery(id);

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
