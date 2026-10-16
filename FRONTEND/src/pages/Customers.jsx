import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";
import { MdOutlineDeleteSweep } from "react-icons/md";

const Customers = () => {
  return (
    <div className="w-full h-full px-4 py-4 space-y-4">
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-2xl text-neutral-800">Customers List</h4>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-full p-6 bg-white shadow-lg rounded-md space-y-2">
            <div className="flex justify-between">
              <h4 className="text-lg font-bold text-neutral-800">
                Total Customers
              </h4>
              <HiDotsVertical className="text-xl" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-4xl font-bold">2,394</h4>
                <p className="text-base text-neutral-500">All days</p>
              </div>
              <div>
                <p className="text-xl text-green-500">14.4%</p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 bg-white shadow-lg rounded-md space-y-2">
            <div className="flex justify-between">
              <h4 className="text-lg font-bold text-neutral-800">New Customers</h4>
              <HiDotsVertical className="text-xl" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-4xl font-bold">394</h4>
                <p className="text-base text-neutral-500">Last 7 days</p>
              </div>
              <div>
                <p className="text-xl text-green-500">14.4%</p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 bg-white shadow-lg rounded-md space-y-2">
            <div className="flex justify-between">
              <h4 className="text-lg font-bold text-neutral-800">
                Visitors
              </h4>
              <HiDotsVertical className="text-xl" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-4xl font-bold">2,394</h4>
                <p className="text-base text-neutral-500">Last 7 days</p>
              </div>
              <div>
                <p className="text-xl text-green-500">14.4%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-150 overflow-y-auto p-6 bg-white shadow-lg rounded-md space-y-6">
        <div className="">
          <div className="grid grid-cols-7 justify-items-center bg-neutral-200 py-3 rounded-md">
            <div className="text-neutral-800 font-bold">Customer Id</div>
            <div className="text-neutral-800 font-bold">Name</div>
            <div className="text-neutral-800 font-bold">Phone</div>
            <div className="text-neutral-800 font-bold">Order Count</div>
            <div className="text-neutral-800 font-bold">Total Spend</div>
            <div className="text-neutral-800 font-bold">Status</div>
            <div className="text-neutral-800 font-bold">Action</div>
          </div>

          <div className="grid grid-cols-7 items-center justify-items-center py-3 border-b-2 border-neutral-200">
            <div className="text-neutral-800 font-medium">#5563</div>
            <div className="text-neutral-800 font-medium">Naruto Uzumaki</div>
            <div className="text-neutral-800 font-medium flex items-center gap-2">
              +8801712345678
            </div>
            <div className="text-neutral-800 font-medium">25</div>
            <div className="text-neutral-800 font-medium">৳ 2505</div>
            <div className="text-neutral-800 font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-green-500">Active</p>
            </div>
            <div className="text-neutral-800 font-medium flex items-center gap-2">
              <BiMessageDetail className="text-lg hover:text-green-500 cursor-pointer active:scale-95 transition-all duration-200" />
              <MdOutlineDeleteSweep className="text-xl hover:text-red-500 cursor-pointer active:scale-95 transition-all duration-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
