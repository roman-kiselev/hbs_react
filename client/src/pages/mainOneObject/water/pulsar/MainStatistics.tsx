import { Row } from "react-bootstrap";
import { buttonGroupConfigWaterPulsar } from "../../../../shared/config";
import { ButtonGroupCol } from "../../../../shared/ui";

const MainStatistics = () => {
    return (
        <Row>
            <Row>Статистика</Row>
            <Row>
                <ButtonGroupCol config={buttonGroupConfigWaterPulsar} />
            </Row>
        </Row>
    );
};

export default MainStatistics;
