import { useAppSelector } from "../../shared/hooks";

interface CheckAuthProps {
    children: React.ReactNode;
}

const CheckAuth: React.FC<CheckAuthProps> = ({ children }) => {
    const { isAuth } = useAppSelector((state) => state.user);

    return <>{children}</>;
};

export default CheckAuth;
