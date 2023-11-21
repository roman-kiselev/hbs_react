import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import MyNavBar from "../../shared/ui/layout/MyNavBar";

const AdminLayout = () => {
    return (
        <>
            <MyNavBar />
            <Container fluid={true}>
                <Outlet />
            </Container>
        </>
    );
};

export default AdminLayout;
