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
              <p className="font-normal text-neutral-500 text-sm">Last 7 days</p>
            </div>
            <div className="cursor-pointer active:scale-95 hover:text-neutral-700 transition-all duration-200">
              <BsThreeDotsVertical className="text-2xl" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold text-neutral-800">৳ 50,000</h4>
              <p className="font-normal text-sm text-neutral-600">
                Previous 7 days{" "}
                <span className="text-blue-400 text-base">( ৳ 40,000 )</span>
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
              <p className="font-normal text-neutral-500 text-sm">All days</p>
            </div>
            <div className="cursor-pointer active:scale-95 hover:text-neutral-700 transition-all duration-200">
              <BsThreeDotsVertical className="text-2xl" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold text-neutral-800">6,000</h4>
              <p className="font-normal text-sm text-neutral-600">
                Previous 7 days{" "}
                <span className="text-blue-400 text-base">( 500 users )</span>
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
              <p className="font-normal text-neutral-500 text-sm">Last 7 days</p>
            </div>
            <div className="cursor-pointer active:scale-95 hover:text-neutral-700 transition-all duration-200">
              <BsThreeDotsVertical className="text-2xl" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold text-neutral-800">10.08 k</h4>
              <p className="font-normal text-sm text-neutral-600">
                Previous 7 days{" "}
                <span className="text-blue-400 text-base">( 9.0k orders )</span>
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
          <div className="flex items-center justify-between pb-2">
            <div>
              <h4 className="text-3xl font-bold text-neutral-800">
                Transaction
              </h4>
            </div>
            <div className="py-2 px-4 flex items-center gap-4 bg-primary text-white rounded-md active:scale-95 transition-all duration-200 cursor-pointer">
              <button className="cursor-pointer">Filter</button>
              <IoFilterOutline />
            </div>
          </div>
          <div className="grid grid-cols-5 justify-items-center border-b-2 border-neutral-200 py-2 bg-neutral-100 font-bold text-neutral-800">
            <div>No</div>
            <div>Id Customer</div>
            <div>Order Date</div>
            <div>Status</div>
            <div>Amount</div>
          </div>
          <div className="grid grid-cols-5 justify-items-center py-2 bg-neutral-50 text-neutral-700 rounded-md font-medium">
            <div>1.</div>
            <div>#5563</div>
            <div>01 Oct | 11:29 am</div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <h2 className="text-green-400">Paid</h2>
            </div>
            <div>৳40,000</div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-8/12 h-150 overflow-y-auto bg-white p-6 rounded-md shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h4 className="text-3xl font-bold text-neutral-800">
                Best Selling Prodcut
              </h4>
            </div>
            <div className="py-2 px-4 flex items-center gap-4 bg-primary text-white rounded-md active:scale-95 transition-all duration-200 cursor-pointer">
              <button className="cursor-pointer">Filter</button>
              <IoFilterOutline />
            </div>
          </div>
          <div className="grid grid-cols-4 justify-items-center border-b-2 border-neutral-200 py-2 bg-neutral-100 text-slate-800">
            <div>Products</div>
            <div>Total Orders</div>
            <div>Status</div>
            <div>Price</div>
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
              <p>Black T-shirt</p>
            </div>
            <div>104</div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <h2 className="text-green-400">Stock</h2>
            </div>
            <div>৳40,000</div>
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
                  <h4 className="font-medium text-neutral-800">Black T-shirt</h4>
                  <p className="text-xs text-neutral-500">Item: #FXZ-4654</p>
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
