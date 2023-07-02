import { EnRole } from "../../config/enumRole";

export default interface INavLinkAskueProps {
    textDecoration?: string;
    margin?: number;
    color?: string;
    title: string;
    to: string;
    accessFor?: EnRole[];
}
