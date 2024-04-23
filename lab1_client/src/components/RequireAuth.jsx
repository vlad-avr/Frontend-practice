import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = ({ allowedRoles }) =>{
    const {auth} = useAuth();
    const location = useLocation();
    console.log(allowedRoles)
    console.log(auth.role)
    return(
        // allowedPwds?.includes(auth?.pwd)
        //     ? <Outlet />
        //     : auth?.user
        //         ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        //         : <Navigate to="/" state={{ from: location }} replace />
        allowedRoles?.includes(auth?.role)
        ? <Outlet/>
        : <Navigate to="unauthorized" state={{from: location}} replace/>
    );
}

export default RequireAuth;