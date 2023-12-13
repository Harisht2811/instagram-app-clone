import React  from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom";


const ProtectedRoute = () => {
  const authenticatedUser = window.sessionStorage.getItem('isLoggedin');
  const location = useLocation();

  return authenticatedUser ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace state={{ path: location.pathname }} />
  );
}


export default ProtectedRoute;

