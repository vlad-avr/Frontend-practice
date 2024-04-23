import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = ({ allowedPwds }) =>{
    const {auth} = useAuth();
    const location = useLocation();
    console.log(allowedPwds)
    {console.log(auth.pwd)}
    return(
        // allowedPwds?.includes(auth?.pwd)
        //     ? <Outlet />
        //     : auth?.user
        //         ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        //         : <Navigate to="/" state={{ from: location }} replace />
        allowedPwds?.includes(auth?.pwd)
        ? <Outlet/>
        : <Navigate to="unauthorized" state={{from: location}} replace/>
    );
}

export default RequireAuth;