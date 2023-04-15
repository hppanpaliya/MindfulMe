import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const PrivateRoute = () => {
  const auth = useSelector((state) => state.auth);

  if (auth.loading) {
    return <CircularProgress />;
  }

  return auth.user === null ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
