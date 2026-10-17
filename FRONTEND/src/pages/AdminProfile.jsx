import React, { useState } from "react";
import assets from "../assets/assets";
import { FcGoogle } from "react-icons/fc";
import { CiLink } from "react-icons/ci";
import { MdFacebook } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import toast from "react-hot-toast";

const AdminProfile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [rePassword, setRePassword] = useState("");
  const [showRePassword, setShowRePassword] = useState(false);

  const handleChange = () => {
    if (!currentPassword) {
      toast.error("Please fill current password!");
      return;
    }
    if (!newPassword) {
      toast.error("Please fill new password!");
      return;
    }
    if (!rePassword) {
      toast.error("Please fill re password!");
      return;
    }
    if (newPassword !== rePassword) {
      toast.error("Please type same password!");
      return;
    }
  };

  // update profile data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [location, setLocation] = useState("");
  const [biography, setBiography] = useState("");

  const handleProfile = () => {
    if (!firstName) {
      toast.error("Please enter first name!");
      return;
    }
    if (!lastName) {
      toast.error("Please enter last name!");
      return;
    }
    if (!password) {
      toast.error("Please enter password!");
      return;
    }
    if (!number) {
      toast.error("Please enter number!");
      return;
    }
    if (!email) {
      toast.error("Please enter email!");
      return;
    }
    if (!dateOfBirth) {
      toast.error("Please enter date of birth!");
      return;
    }
    if (!location) {
      toast.error("Please enter location!");
      return;
    }
    if (!biography) {
      toast.error("Please enter biography!");
      return;
    }
  };

  return (
    <div className="w-full flex gap-4 p-6">
      <div className="w-4/12 space-y-4">
        <div className="flex items-center justify-center flex-col bg-white shadow-lg rounded-md py-10">
          <div className="w-20 h-20 rounded-ful">
            <img
              className="w-full h-full rounded-full object-cover"
              src={assets.profile}
              alt=""
            />
          </div>
          <div className="text-center">
            <h4 className="text-2xl font-bold text-neutral-800">Piyal Hasan</h4>
            <p className="text-base font-medium text-neutral-500">
              fullstackdeveloper@gamil.com
            </p>
          </div>
          <div className="flex items-center justify-center flex-col mt-8 gap-4">
            <h4>Linked with social media</h4>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 cursor-pointer">
                <FcGoogle size={26} />
                <div className="flex items-center gap-2 text-blue-400 text-xs">
                  <CiLink size={20} />
                  Linked
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <MdFacebook className="text-blue-500" size={26} />
                <div className="flex items-center gap-2 text-blue-400 text-xs">
                  <CiLink size={20} />
                  Linked
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <FaXTwitter size={26} />
                <div className="flex items-center gap-2 text-blue-400 text-xs">
                  <CiLink size={20} />
                  Linked
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-10 py-10 bg-white space-y-4 shadow-lg rounded-md">
          <div className="w-full space-y-2">
            <p className="text-base font-bold text-neutral-800">
              Current Password
            </p>
            <div className="relative">
              <input
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              {showCurrentPassword ? (
                <GoEye
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute top-1/2 -translate-1/2 right-2 text-neutral-600 cursor-pointer text-lg"
                />
              ) : (
                <GoEyeClosed
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute top-1/2 -translate-1/2 right-2 text-neutral-600 cursor-pointer text-lg"
                />
              )}
            </div>
          </div>
          <div className="w-full space-y-2">
            <p className="text-base font-bold text-neutral-800">New Password</p>
            <div className="relative">
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              {showNewPassword ? (
                <GoEye
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute top-1/2 -translate-1/2 right-2 text-neutral-600 cursor-pointer text-lg"
                />
              ) : (
                <GoEyeClosed
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute top-1/2 -translate-1/2 right-2 text-neutral-600 cursor-pointer text-lg"
                />
              )}
            </div>
          </div>
          <div className="w-full space-y-2">
            <p className="text-base font-bold text-neutral-800">
              Re-enter Password
            </p>
            <div className="relative">
              <input
                onChange={(e) => setRePassword(e.target.value)}
                className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
                type={showRePassword ? "text" : "password"}
                placeholder="Enter password"
              />
              {showRePassword ? (
                <GoEye
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="absolute top-1/2 -translate-1/2 right-2 text-neutral-600 cursor-pointer text-lg"
                />
              ) : (
                <GoEyeClosed
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="absolute top-1/2 -translate-1/2 right-2 text-neutral-600 cursor-pointer text-lg"
                />
              )}
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleChange}
              className="w-full text-center py-2 bg-primary rounded-md text-white font-bold cursor-pointer active:scale-95 duration-200"
            >
              Save Change
            </button>
          </div>
        </div>
      </div>
      <div className="w-8/12 bg-white shadow-lg rounded-md px-10 py-10 space-y-2">
        <div className="text-xl font-bold">Profile Update</div>
        <div className="flex items-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full">
            <img
              className="w-full h-full rounded-full object-cover"
              src={assets.profile}
              alt=""
            />
          </div>
          <div className="space-x-2">
            <button className="py-2 px-4 bg-primary rounded-md text-white font-bold active:scale-95 transition-all duration-200 cursor-pointer">
              Upload New
            </button>
            <button className="py-2 px-4 border-2 border-neutral-300 rounded-md text-neutral-600 font-bold cursor-pointer active:scale-95 transition-all duration-200">
              Delete
            </button>
          </div>
        </div>
        <div className="w-full flex items-center gap-4">
          <div className="w-full space-y-2">
            <p className="text-base font-bold text-neutral-800">First Name</p>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div className="w-full space-y-2">
            <p className="text-base font-bold text-neutral-800">Last Name</p>
            <input
              onChange={(e) => setLastName(e.target.value)}
              className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="w-full flex gap-4">
          <div className="w-full space-y-2">
            <p className="text-base font-bold text-neutral-800">Password</p>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              {showPassword ? (
                <GoEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-1/2 right-2 text-neutral-600 cursor-pointer text-lg"
                />
              ) : (
                <GoEyeClosed
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-1/2 right-2 text-neutral-600 cursor-pointer text-lg"
                />
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="w-full space-y-2">
              <p className="text-base font-bold text-neutral-800">Number</p>
              <div className="relative">
                <input
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
                  type="text"
                  placeholder="Enter number"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-4">
          <div className="w-full space-y-2">
            <p className="text-base font-bold text-neutral-800">Email</p>
            <div className="relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
                type="email"
                placeholder="Enter password"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="w-full space-y-2">
              <p className="text-base font-bold text-neutral-800">
                Date of Birth
              </p>
              <div className="relative">
                <input
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
                  type="date"
                  placeholder="Enter date of birth"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full">
            <div className="w-full space-y-2">
              <p className="text-base font-bold text-neutral-800">Location</p>
              <div className="relative">
                <input
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
                  type="text"
                  placeholder="Enter address"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full">
            <div className="w-full space-y-2">
              <p className="text-base font-bold text-neutral-800">Biography</p>
              <div className="relative">
                <textarea
                  onChange={(e) => setBiography(e.target.value)}
                  className="w-full py-2 px-4 outline-0 border-2 border-neutral-200 rounded-md text-sm font-medium tracking-wide"
                  type="text"
                  placeholder="Enter biography"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={handleProfile}
            className="w-full text-center py-2 bg-primary rounded-md text-white font-bold cursor-pointer active:scale-95 duration-200"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
