import React from "react";
import { Navigate } from "react-router-dom";
const Protected = ({ children }) => {
  const user = true;
  if (!user) return <Navigate to="/welcome" />;

  return children;
};

export default Protected;
