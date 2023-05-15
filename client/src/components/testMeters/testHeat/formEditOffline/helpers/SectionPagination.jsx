import React from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

const SectionPagination = ({
    listSection,
    handleClickAndSetState,
    setState,
}) => {
    return (
        <>
            <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="me-2" aria-label="First group">
                    {listSection !== undefined && listSection.length > 0 ? (
                        listSection.map((section) => (
                            <Button
                                key={section}
                                onClick={() => handleClickAndSetState(section)}
                            >
                                {section}
                            </Button>
                        ))
                    ) : (
                        <></>
                    )}
                </ButtonGroup>
            </ButtonToolbar>
        </>
    );
};

export default SectionPagination;
