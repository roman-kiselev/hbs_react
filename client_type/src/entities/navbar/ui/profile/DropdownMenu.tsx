import React from "react";
import { Dropdown } from "react-bootstrap";
import DropdownItemModal from "./DropdownItemModal";

const DropdownMenu: React.FC = () => {
    return (
        <Dropdown style={{ marginRight: "4rem" }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Меню
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <DropdownItemModal />
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Выход</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownMenu;
