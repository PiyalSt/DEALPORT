import React from "react";
import assets from "../assets/assets";
import { Link, NavLink } from "react-router";
import { ImHome } from "react-icons/im";
import { MdShoppingCart } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { RiCoupon2Line } from "react-icons/ri";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaCreditCard } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiSignOutBold } from "react-icons/pi";

const DashboardSideNavbar = () => {
  return (
    <div className="w-full h-full bg-white overflow-y-auto border-r-2 border-neutral-200">
      <div className="p-6">
        <Link to={"/"}>
          <img src={assets.logo} alt="logo" />
        </Link>
      </div>
      <div>
        <div className="px-6">
          <h4 className="font-normal text-sm text-text">Main menu</h4>
        </div>
        <div className="px-6 py-4 space-y-2">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 py-2 px-4 rounded-md cursor-pointer hover:bg-primary hover:text-white hover:font-bold active:scale-95 transition-all duration-200 ${isActive ? "bg-primary text-white font-bold" : "bg-transparent text-text"}`
            }
          >
            <ImHome />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={"/order"}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 py-2 px-4 rounded-md cursor-pointer hover:bg-primary hover:text-white hover:font-bold active:scale-95 transition-all duration-200 ${isActive ? "bg-primary text-white font-bold" : "bg-transparent text-text"}`
            }
          >
            <MdShoppingCart />
            <p>Order Management</p>
          </NavLink>
          <NavLink
            to={"/customer"}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 py-2 px-4 rounded-md cursor-pointer hover:bg-primary hover:text-white hover:font-bold active:scale-95 transition-all duration-200 ${isActive ? "bg-primary text-white font-bold" : "bg-transparent text-text"}`
            }
          >
            <LuUsers />
            <p>Customers</p>
          </NavLink>
          <NavLink
            to={"/couponcode"}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 py-2 px-4 rounded-md cursor-pointer hover:bg-primary hover:text-white hover:font-bold active:scale-95 transition-all duration-200 ${isActive ? "bg-primary text-white font-bold" : "bg-transparent text-text"}`
            }
          >
            <RiCoupon2Line />
            <p>Coupon Code</p>
          </NavLink>
          <NavLink
            to={"/category"}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 py-2 px-4 rounded-md cursor-pointer hover:bg-primary hover:text-white hover:font-bold active:scale-95 transition-all duration-200 ${isActive ? "bg-primary text-white font-bold" : "bg-transparent text-text"}`
            }
          >
            <BiSolidCategoryAlt />
            <p>Categories</p>
          </NavLink>
          <NavLink
            to={"/transaction"}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 py-2 px-4 rounded-md cursor-pointer hover:bg-primary hover:text-white hover:font-bold active:scale-95 transition-all duration-200 ${isActive ? "bg-primary text-white font-bold" : "bg-transparent text-text"}`
            }
          >
            <FaCreditCard />
            <p>Transaction</p>
          </NavLink>
        </div>
      </div>
      <div>
        <div className="px-6">
          <h4 className="font-normal text-sm text-text">Products</h4>
        </div>
        <div className="px-6 py-4 space-y-2">
          <NavLink
            to={"/addproducts"}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 py-2 px-4 rounded-md cursor-pointer hover:bg-primary hover:text-white hover:font-bold active:scale-95 transition-all duration-200 ${isActive ? "bg-primary text-white font-bold" : "bg-transparent text-text"}`
            }
          >
            <MdAddCircleOutline size={20} />
            <p>Add Products</p>
          </NavLink>
        </div>
      </div>
      <div>
        <div className="px-6">
          <h4 className="font-normal text-sm text-text">Admin</h4>
        </div>
        <div className="px-6 py-4 space-y-2">
          <NavLink
            to={"/adminprofile"}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 py-2 px-4 rounded-md cursor-pointer hover:bg-primary hover:text-white hover:font-bold active:scale-95 transition-all duration-200 ${isActive ? "bg-primary text-white font-bold" : "bg-transparent text-text"}`
            }
          >
            <FaRegCircleUser size={20} />
            <p>Admin role</p>
          </NavLink>
        </div>
      </div>

      <div className="w-full px-6 bg-green-100/40 py-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full">
            <img
              className="w-full h-full object-cover"
              src={assets.profile}
              alt=""
            />
          </div>
          <div>
            <h4 className="text-neutral-800 font-semibold">Dealport</h4>
            <p className="text-neutral-600 font-medium">dealport@gmail.com</p>
          </div>
        </div>
        <div>
          <button className="w-full flex items-center justify-center gap-2 text-base py-2 rounded-md text-text hover:bg-primary hover:text-white hover:font-bold cursor-pointer active:scale-95 transition-all duration-200 border-2 border-green-100 shadow">
            <PiSignOutBold />
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideNavbar;
