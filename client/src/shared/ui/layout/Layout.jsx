import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { MyNavBar } from "..";

const Layout = () => {
    return (
        <>
            <MyNavBar />
            <Container fluid={true}>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;
