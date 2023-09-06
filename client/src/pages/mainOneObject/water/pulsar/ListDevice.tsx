import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { pulsarWaterApi } from "../../../../shared/api";

const ListDevice = () => {
    const { id } = useParams();
    const { data } = pulsarWaterApi.useGetAllDevicesQuery({
        objectBuildId: Number(id),
    });

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Сч.Импульсов</th>
                    <th></th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    );
};

export default ListDevice;
