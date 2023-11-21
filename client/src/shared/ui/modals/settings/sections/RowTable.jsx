import { Button } from "react-bootstrap";

const RowTable = ({ section }) => {
    return (
        <tr>
            <td>{section.id}</td>
            <td>{section.number}</td>
            <td>
                <Button variant="danger">Удалить</Button>
            </td>
        </tr>
    );
};

export default RowTable;
