import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deskApi } from "../../shared/api/desk";
import AddMeterForm from "./deskForm/AddMeterForm";
import DeskTable from "./deskTable/DeskTable";
import FindedList from "./list/FindedList";

const Desk = () => {
    const { id } = useParams();
    const { data } = deskApi.useGetAllQuery(id);
    const { listDesk, isLoading } = useSelector((store) => store.desk);
    return (
        <Row>
            <Row>
                <AddMeterForm />
            </Row>
            <Row className="mt-3">
                <FindedList />
            </Row>
            <Row className="mt-3">
                <DeskTable listDesk={listDesk} isLoading={isLoading} />
            </Row>
        </Row>
    );
};

export default Desk;
