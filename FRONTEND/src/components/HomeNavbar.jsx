import React from "react";
import assets from "../assets/assets";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

const HomeNavbar = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Top Nav */}
      <div className="w-full flex justify-between items-center border-b-2 border-neutral-200 py-4">
        <div className="w-1/2 flex gap-2 items-center">
          <div className="">
            <img src={assets.logo} alt="" />
          </div>
          <div className="flex items-center gap-2">
            <div>
              <FaLocationDot size={22} className="text-neutral-800" />
            </div>
            <div>
              <p className="text-neutral-600 text-sm">Deliver to</p>
              <h4 className="text-neutral-800 font-medium">Your address</h4>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex items-center gap-4">
          <div className="w-full py-2 px-4 border-2 border-green-800/50 rounded-full flex gap-2 bg-green-100/20 text-neutral-800 font-medium">
            <input className="w-full outline-0" type="text" placeholder="Search products" />
            <IoSearch
              size={22}
              className="text-neutral-800 cursor-pointer active:scale-95 transition-all duration-200"
            />
          </div>
          <div className="group">
            <FaUser
              size={20}
              className="text-neutral-800 cursor-pointer active:scale-95 transition-all duration-200 group-hover:text-green-500"
            />
          </div>
          <div className="flex items-center gap-2 cursor-pointer group">
            <FaShoppingCart size={18} className="text-neutral-800 group-hover:text-green-500 transition-all duration-200" />
            <p className="text-lg font-semibold text-neutral-800 group-hover:text-green-500 transition-all duration-200">Cart</p>
          </div>
        </div>
      </div>
      {/* Bottom Nav */}
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2 cursor-pointer text-neutral-800 hover:text-green-500 transition-all duration-200 font-medium py-2">
            <div className="flex items-center gap-2">
              <FiMenu size={18} />
              <p>Menu</p>
            </div>
            <div className="w-0.5 h-7 bg-neutral-400 rounded-full ml-4"></div>
          </div>
          <div className="cursor-pointer text-neutral-800 hover:text-green-500 transition-all duration-200 font-medium py-2 px-4">
            Explore
          </div>
          <div className="cursor-pointer text-neutral-800 hover:text-green-500 transition-all duration-200 font-medium py-2 px-4">
            Deals
          </div>
          <div className="cursor-pointer text-neutral-800 hover:text-green-500 transition-all duration-200 font-medium py-2 px-4 flex">
            Saved
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="group cursor-pointer text-neutral-800 font-medium hover:text-green-500">
            Home
            <div className="h-1 bg-green-500/40 rounded-full scale-x-0 group-hover:scale-x-100 transition-all duration-200"></div>
          </div>
          <div className="group cursor-pointer text-neutral-800 font-medium hover:text-green-500">
            Product
            <div className="h-1 bg-green-500/40 rounded-full scale-x-0 group-hover:scale-x-100 transition-all duration-200"></div>
          </div>
          <div className="group cursor-pointer text-neutral-800 font-medium hover:text-green-500">
            About Us
            <div className="h-1 bg-green-500/40 rounded-full scale-x-0 group-hover:scale-x-100 transition-all duration-200"></div>
          </div>
          <div className="group cursor-pointer text-neutral-800 font-medium hover:text-green-500">
            Contact
            <div className="h-1 bg-green-500/40 rounded-full scale-x-0 group-hover:scale-x-100 transition-all duration-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
