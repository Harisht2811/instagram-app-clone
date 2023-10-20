import React  from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom";


const ProtectedRoute = ({isLoggedin}) => {
  const location = useLocation();

  return isLoggedin ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace state={{ path: location.pathname }} />
  );
}


export default ProtectedRoute;

