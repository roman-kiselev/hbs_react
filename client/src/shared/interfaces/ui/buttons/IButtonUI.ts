interface IButtonUI {
    label: string;
    variant:
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger"
        | "info"
        | "light"
        | "dark"
        | "link";
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default IButtonUI;
