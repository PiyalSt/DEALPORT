import React from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import assets from "../assets/assets";

const DashboardTopNavbar = () => {
  return (
    <div className="w-full flex justify-between py-4 px-8">
      <div>
        <p className="text-2xl text-neutral-700 font-bold">Dashboard</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-2xl flex items-center gap-4 border-2 py-2 px-4 rounded-md bg-neutral-50 border-neutral-200">
          <input
            className="w-full outline-0 text-neutral-800"
            type="text"
            placeholder="Search data, users, or reports"
          />
          <FiSearch className="text-xl text-neutral-800 active:scale-95 cursor-pointer" />
        </div>
        <div className="relative">
          <IoMdNotificationsOutline className="text-2xl text-neutral-800 cursor-pointer active:scale-95 transition-all duration-200" />
          <div className="w-2 h-2 bg-green-400 rounded-full absolute bottom-0.5 right-0"></div>
        </div>
        <div className="w-10 h-10 rounded-full">
          <img
            className="w-full h-full object-cover"
            src={assets.profile}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTopNavbar;
