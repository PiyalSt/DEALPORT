import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";

const AddProduct = () => {
  return (
    <div className="w-full flex">
      <div className="w-1/2 px-10 py-10">
        <div className="w-full flex flex-col gap-4  bg-white p-6 rounded-md">
          <div className="w-full space-y-2">
            <p className="text-base font-bold text-neutral-800">Product Name</p>
            <input
              className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
              type="text"
              placeholder="Enter product name"
            />
          </div>
          <div className="w-full space-y-2">
            <p className="text-base font-bold text-neutral-800">
              Product Description
            </p>
            <textarea
              className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
              type="text"
              placeholder="Enter product description"
            />
          </div>
          <div className="w-full flex gap-4">
            <div className="w-full space-y-2">
              <p className="text-base font-bold text-neutral-800">
                Product Price
              </p>
              <input
                className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
                type="number"
                placeholder="Enter product name"
              />
            </div>
            <div className="w-full space-y-2">
              <p className="text-base font-bold text-neutral-800">
                Discount Price
              </p>
              <input
                className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
                type="number"
                placeholder="Enter product name"
              />
            </div>
          </div>
          <div className="w-full flex gap-4">
            <div className="w-full space-y-2">
              <p className="text-base font-bold text-neutral-800">
                Stock Quantity
              </p>
              <input
                className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
                type="number"
                placeholder="Enter product name"
              />
            </div>
            <div className="w-full space-y-2">
              <p className="text-base font-bold text-neutral-800">
                Stock Status
              </p>
              <select className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide">
                <option value="in">In Stock</option>
                <option value="out">Out Stock</option>
              </select>
            </div>

          </div>
        </div>
        <div className="mt-10">
          <button className="w-full py-2 bg-primary rounded-md text-white font-bold active:scale-95 transition-all duration-200 cursor-pointer">Publish Product</button>
        </div>
      </div>
      <div className="w-1/2 px-10">
        <div className="flex flex-col gap-4 bg-white p-6 rounded-md mt-10">
          <p className="text-base font-bold text-neutral-800">Product Image</p>

          <div className="flex items-center justify-center">
            {/* Hide the default input style visually but keep it accessible */}
            <input type="file" id="fileUpload" className="hidden" />

            {/* Changed from div to label, and fixed htmlFor */}
            <label
              htmlFor="fileUpload"
              className="border-2 border-dashed border-green-500 flex flex-col items-center justify-center gap-2 py-4 px-6 text-green-500 cursor-pointer"
            >
              <FiPlusCircle size={26} />
              Add Image
            </label>
          </div>
          <div className="flex items-center justify-between px-10 mt-10">
            <label className="border-2 border-neutral-200 flex flex-col items-center justify-center gap-2 py-4 px-6 text-neutral-400 cursor-pointer rounded-md">
              <CiImageOn size={26} />
            </label>
            <label className="border-2 border-neutral-200 flex flex-col items-center justify-center gap-2 py-4 px-6 text-neutral-400 cursor-pointer rounded-md">
              <CiImageOn size={26} />
            </label>
            <label className="border-2 border-neutral-200 flex flex-col items-center justify-center gap-2 py-4 px-6 text-neutral-400 cursor-pointer rounded-md">
              <CiImageOn size={26} />
            </label>
            <label className="border-2 border-neutral-200 flex flex-col items-center justify-center gap-2 py-4 px-6 text-neutral-400 cursor-pointer rounded-md">
              <CiImageOn size={26} />
            </label>
          </div>

          <div className="space-y-4">
            <div className="w-full space-y-2">
              <p className="text-base font-bold text-neutral-800">
                Product Categories
              </p>
              <select className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide">
                <option value="in">Select your product</option>
                <option value="in">In Stock</option>
                <option value="out">Out Stock</option>
              </select>
            </div>
            <div className="w-full space-y-2">
              <p className="text-base font-bold text-neutral-800">
                Select your color
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-amber-400 border-2 border-transparent hover:border-gray-800 hover:cursor-pointer"></div>
                <div className="w-10 h-10 rounded-md bg-green-400 border-2 border-transparent hover:border-gray-800 hover:cursor-pointer"></div>
                <div className="w-10 h-10 rounded-md bg-cyan-400 border-2 border-transparent hover:border-gray-800 hover:cursor-pointer"></div>
                <div className="w-10 h-10 rounded-md bg-red-400 border-2 border-transparent hover:border-gray-800 hover:cursor-pointer"></div>
                <div className="w-10 h-10 rounded-md bg-black border-2 border-transparent hover:border-gray-800 hover:cursor-pointer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
