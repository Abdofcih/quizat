import React from "react";
import { Outlet } from "react-router-dom";
const SharedLayout = () => {
  return (
    <div>
      <h1>Navbar here</h1>
      <Outlet />
    </div>
  );
};

export default SharedLayout;
