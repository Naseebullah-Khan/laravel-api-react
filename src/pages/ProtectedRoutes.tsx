import { Navigate } from "react-router-dom";
import useAppContext from "../Context/useAppContext";

interface AuthRoutesProp {
    children: React.ReactNode
}

export default function ProtectedRoutes({ children }: AuthRoutesProp) {
    const { user } = useAppContext();

    if (!(user && user.name)) {
        return <Navigate to="/login" />;
    }

    return children;
}
