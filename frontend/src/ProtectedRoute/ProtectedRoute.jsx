import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  if (!user && !isAuthenticated) {
    return <Navigate to="/login"/>;
  }
  return children;
};

export default ProtectedRoute;
