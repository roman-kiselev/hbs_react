//shared/hooks — кастомные хуки.
import { useInput } from "./ui";
import { useStringForFormInput } from "./ui/inputsString";
import useShowAndClose from "./ui/modals/useShowAndClose";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import useNumber from "./useNumber";
import useString from "./useString";
import useType from "./useType";

export {
    useAppDispatch,
    useAppSelector,
    useInput,
    useNumber,
    useShowAndClose,
    useString,
    useStringForFormInput,
    useType,
};
