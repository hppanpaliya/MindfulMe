import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const auth = useSelector((state) => state.auth);

  return auth.user === null ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
