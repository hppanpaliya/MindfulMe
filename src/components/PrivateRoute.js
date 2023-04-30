import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  if (auth.loading) {
    return <CircularProgress />;
  }

  return auth.user === null ? <Navigate to="/login" state={{ from: location }} /> : <Outlet />;
};

export default PrivateRoute;
