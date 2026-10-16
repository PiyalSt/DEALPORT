import React from "react";
import DashboardSideNavbar from "../components/DashboardSideNavbar";
import DashboardTopNavbar from "../components/DashboardTopNavbar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-2/12 h-full">
        <DashboardSideNavbar />
      </div>
      <div className="w-10/12 h-screen flex flex-col">
        <div className="w-full">
          <DashboardTopNavbar />
        </div>
        <div className="w-full flex-1 bg-neutral-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
