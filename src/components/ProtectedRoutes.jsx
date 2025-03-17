import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.userRole)) {
    return <Navigate to={user.userRole === "admin" ? "/Dashboard" : "/Dashbo"}/>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
