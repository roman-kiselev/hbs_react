interface ILinkItemGroupProps {
    title: string;
    action: boolean;
    to: string;
    disabled?: boolean;
    variant:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "light"
        | "dark";
}

export default ILinkItemGroupProps;
