//shared/hooks — кастомные хуки.
import useNumber from "./useNumber";
import useString from "./useString";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { useStringForFormInput } from "./ui/inputsString";
import useShowAndClose from "./ui/modals/useShowAndClose";

export {
    useNumber,
    useString,
    useAppDispatch,
    useAppSelector,
    useStringForFormInput,
    useShowAndClose,
};
