import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowUp } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import assets from "../assets/assets";
import { FiSearch } from "react-icons/fi";

const Dashboard = () => {
  return (
    <div className="py-4 px-4 space-y-4">
      <div className="flex gap-4">
        <div className="w-full bg-white p-6 rounded-md shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-neutral-800">
                Total Sales
              </h4>
              <p className="font-normal text-neutral-500">Last 7 days</p>
            </div>
            <div className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center cursor-pointer">
              <BsThreeDotsVertical className="text-lg" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold text-neutral-800">৳ 50,000</h4>
              <p className="font-normal text-sm text-neutral-500">
                Previous 7 days{" "}
                <span className="text-blue-400">(৳ 40,000)</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="text-lg font-bold text-neutral-800">Sales</h5>
              <div className="flex items-center gap-2 text-green-400">
                <FaArrowUp size={14} />
                <span>10.4%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white p-6 rounded-md shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-neutral-800">
                Total Users
              </h4>
              <p className="font-normal text-neutral-500">All days</p>
            </div>
            <div className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center cursor-pointer">
              <BsThreeDotsVertical className="text-lg" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold text-neutral-800">6,000</h4>
              <p className="font-normal text-sm text-neutral-500">
                Previous 7 days{" "}
                <span className="text-blue-400">(500 users)</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="text-lg font-bold text-neutral-800">Sales</h5>
              <div className="flex items-center gap-2 text-green-400">
                <FaArrowUp size={14} />
                <span>10.4%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white p-6 rounded-md shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-neutral-800">
                Total Orders
              </h4>
              <p className="font-normal text-neutral-500">Last 7 days</p>
            </div>
            <div className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center cursor-pointer">
              <BsThreeDotsVertical className="text-lg" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold text-neutral-800">10.08 k</h4>
              <p className="font-normal text-sm text-neutral-500">
                Previous 7 days{" "}
                <span className="text-blue-400">(9.0k orders)</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="text-lg font-bold text-neutral-800">Sales</h5>
              <div className="flex items-center gap-2 text-green-400">
                <FaArrowUp size={14} />
                <span>6.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full h-150 overflow-y-auto bg-white p-6 rounded-md shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold text-neutral-800">
                Transaction
              </h4>
            </div>
            <div className="py-2 px-4 flex items-center gap-4 bg-primary text-white rounded-md active:scale-95 transition-all duration-200 cursor-pointer">
              <button>Filter</button>
              <IoFilterOutline />
            </div>
          </div>
          <div className="grid grid-cols-5 justify-items-center border-b-2 border-neutral-200 py-2">
            <div>
              <h4>No</h4>
            </div>
            <div>
              <h4>Id Customer</h4>
            </div>
            <div>
              <h4>Order Date</h4>
            </div>
            <div>
              <h4>Status</h4>
            </div>
            <div>
              <h4>Amount</h4>
            </div>
          </div>
          <div className="grid grid-cols-5 justify-items-center py-2">
            <div>
              <h2>1.</h2>
            </div>
            <div>
              <h2>#5563</h2>
            </div>
            <div>
              <h2>01 Oct | 11:29 am</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <h2 className="text-green-400">Paid</h2>
            </div>
            <div>
              <h2>৳40,000</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-8/12 h-150 overflow-y-auto bg-white p-6 rounded-md shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold text-neutral-800">
                Best selling prodcut
              </h4>
            </div>
            <div className="py-2 px-4 flex items-center gap-4 bg-primary text-white rounded-md active:scale-95 transition-all duration-200 cursor-pointer">
              <button>Filter</button>
              <IoFilterOutline />
            </div>
          </div>
          <div className="grid grid-cols-4 justify-items-center border-b-2 border-neutral-200 py-2">
            <div>
              <h4>Products</h4>
            </div>
            <div>
              <h4>Total Orders</h4>
            </div>
            <div>
              <h4>Status</h4>
            </div>
            <div>
              <h4>Price</h4>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center justify-items-center py-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10">
                <img
                  className="w-full h-full object-cover"
                  src={assets.tShirt}
                  alt=""
                />
              </div>
              <h2>Black T-shirt</h2>
            </div>
            <div>
              <h2>104</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <h2 className="text-green-400">Stock</h2>
            </div>
            <div>
              <h2>৳40,000</h2>
            </div>
          </div>
        </div>
        <div className="w-4/12 h-150 overflow-y-auto bg-white p-6 rounded-md shadow-lg space-y-4">
          <div className="space-y-2">
            <h4 className="text-2xl font-bold text-neutral-800">
              Top products
            </h4>

            <div className="w-full flex items-center gap-4 border-2 py-2 px-4 rounded-md bg-neutral-50 border-neutral-200">
              <FiSearch className="text-xl text-neutral-800 active:scale-95 cursor-pointer" />
              <input
                className="w-full outline-0 text-neutral-800"
                type="text"
                placeholder="Search best products"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between py-2 border-b-2 border-neutral-200">
              <div className="flex gap-4">
                <div>
                  <img src={assets.tShirt} alt="" />
                </div>
                <div>
                  <h4>Black T-shirt</h4>
                  <p>Item: #FXZ-4654</p>
                </div>
              </div>
              <div>৳ 238</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
