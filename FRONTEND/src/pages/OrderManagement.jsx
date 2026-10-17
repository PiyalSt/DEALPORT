import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import assets from "../assets/assets";

const OrderManagement = () => {
  return (
    <div className="w-full h-full px-4 py-4 space-y-4">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-full p-6 bg-white shadow-lg rounded-md space-y-4">
            <div className="flex justify-between">
              <h4 className="text-lg font-bold text-neutral-800">
                Total Orders
              </h4>
              <div className="cursor-pointer active:scale-95 hover:text-neutral-700 transition-all duration-200">
                <BsThreeDotsVertical className="text-2xl" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-3xl font-bold text-neutral-800">2,394</h4>
                <p className="text-sm text-neutral-500">All days</p>
              </div>
              <div>
                <p className="text-xl text-green-500">14.4%</p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 bg-white shadow-lg rounded-md space-y-4">
            <div className="flex justify-between">
              <h4 className="text-lg font-bold text-neutral-800">New Orders</h4>
              <div className="cursor-pointer active:scale-95 hover:text-neutral-700 transition-all duration-200">
                <BsThreeDotsVertical className="text-2xl" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-3xl font-bold text-neutral-800">2,394</h4>
                <p className="text-sm text-neutral-500">Last 7 days</p>
              </div>
              <div>
                <p className="text-xl text-green-500">14.4%</p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 bg-white shadow-lg rounded-md space-y-4">
            <div className="flex justify-between">
              <h4 className="text-lg font-bold text-neutral-800">
                Completed Orders
              </h4>
              <div className="cursor-pointer active:scale-95 hover:text-neutral-700 transition-all duration-200">
                <BsThreeDotsVertical className="text-2xl" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-3xl font-bold text-neutral-800">2,394</h4>
                <p className="text-sm text-neutral-500">Last 7 days</p>
              </div>
              <div>
                <p className="text-xl text-green-500">14.4%</p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 bg-white shadow-lg rounded-md space-y-4">
            <div className="flex justify-between">
              <h4 className="text-lg font-bold text-neutral-800">
                Canceled Orders
              </h4>
              <div className="cursor-pointer active:scale-95 hover:text-neutral-700 transition-all duration-200">
                <BsThreeDotsVertical className="text-2xl" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-3xl font-bold text-neutral-800">2,394</h4>
                <p className="text-sm text-neutral-500">Last 7 days</p>
              </div>
              <div>
                <p className="text-xl text-green-500">14.4%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-150 overflow-y-auto p-6 bg-white shadow-lg rounded-md space-y-6">
        <div className="w-full flex justify-between">
          <div className="w-1/2 py-2 px-4 flex gap-3">
            <div className="py-2 px-4 bg-primary rounded-md text-white font-bold cursor-pointer active:scale-95 transition-all duration-200">
              All order ( 240 )
            </div>
            <div className="py-2 px-4 hover:bg-primary hover:text-white text-neutral-800 rounded-md font-bold cursor-pointer active:scale-95 transition-all duration-200">
              Delivered
            </div>
            <div className="py-2 px-4 hover:bg-primary hover:text-white text-neutral-800 rounded-md font-bold cursor-pointer active:scale-95 transition-all duration-200">
              Pending
            </div>
            <div className="py-2 px-4 hover:bg-primary hover:text-white text-neutral-800 rounded-md font-bold cursor-pointer active:scale-95 transition-all duration-200">
              Canceled
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-between gap-4">
            <div className="w-2xl border-2 border-neutral-200 py-2 px-4 flex items-center justify-between gap-4 rounded-md">
              <input
                className="w-full outline-0 text-neutral-800 font-medium"
                type="text"
                placeholder="Search order report"
              />
              <FiSearch />
            </div>
            <div className="py-2 px-4 border-2 border-neutral-200 rounded-md cursor-pointer active:scale-95 transition-all duration-200">
              <HiDotsHorizontal className="text-xl" />
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-7 justify-items-center bg-neutral-100 py-3 rounded-md">
            <div className="text-neutral-800 font-bold">No.</div>
            <div className="text-neutral-800 font-bold">Order Id</div>
            <div className="text-neutral-800 font-bold">Product</div>
            <div className="text-neutral-800 font-bold">Date</div>
            <div className="text-neutral-800 font-bold">Price</div>
            <div className="text-neutral-800 font-bold">Payment</div>
            <div className="text-neutral-800 font-bold">Status</div>
          </div>

          <div className="grid grid-cols-7 items-center justify-items-center py-3 border-b-2 border-neutral-200">
            <div className="text-neutral-800 font-medium">1.</div>
            <div className="text-neutral-800 font-medium">#5563</div>
            <div className="text-neutral-800 font-medium flex items-center gap-2">
              <div className="w-10 h-10">
                <img
                  className="w-full h-full object-cover"
                  src={assets.tShirt}
                  alt=""
                />
              </div>
              <p>Black T-shirt</p>
            </div>
            <div className="text-neutral-800 font-medium">01-01-2026</div>
            <div className="text-neutral-800 font-medium">৳ 230</div>
            <div className="text-neutral-800 font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-green-500">Paid</p>
            </div>
            <div className="text-neutral-800 font-medium">Delivered</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
