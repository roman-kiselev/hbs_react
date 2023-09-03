import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IButtonGroupConfig } from "../../interfaces";

interface ButtonGroupProps {
    config: IButtonGroupConfig[];
}

const ButtonGroupCol: React.FC<ButtonGroupProps> = ({ config }) => {
    return (
        <ButtonGroup aria-label="Basic example">
            {config.map(({ link, title, variant }) => (
                <Link key={link} to={link}>
                    <Button variant={variant}>{title}</Button>
                </Link>
            ))}
        </ButtonGroup>
    );
};

export default ButtonGroupCol;
