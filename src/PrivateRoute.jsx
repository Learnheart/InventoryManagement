import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

const PrivateRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default PrivateRoute;
