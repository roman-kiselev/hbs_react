export interface IModalUiProps {
    show: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    handleAction: () => void;
    children: React.ReactNode;
    title: string;
    titleClose?: string;
    titleSave?: string;
    animation?: boolean;
}
