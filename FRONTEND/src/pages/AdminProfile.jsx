import React from 'react'
import assets from '../assets/assets'
import { FcGoogle } from "react-icons/fc";
import { CiLink } from "react-icons/ci";
import { MdFacebook } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

const AdminProfile = () => {
  return (
    <div className='w-full flex gap-4 p-6'>
      <div className='w-4/12 h-screen bg-white shadow-lg rounded-md'>
        <div className='flex items-center justify-center flex-col'>
          <div className='w-20 h-20 rounded-ful mt-10'>
            <img className='w-full h-full rounded-full object-cover' src={assets.profile} alt="" />
          </div>
          <div className='text-center'>
            <h4 className='text-2xl font-bold text-neutral-800'>Piyal Hasan</h4>
            <p className='text-base font-medium text-neutral-500'>fullstackdeveloper@gamil.com</p>
          </div>
          <div className='flex items-center justify-center flex-col mt-8 gap-4'>
            <h4>Linked with social media</h4>
            <div className='flex gap-2'>
              <div className='flex items-center gap-2 cursor-pointer'>
                <FcGoogle size={26} />
                <div className='flex items-center gap-2 text-blue-400 text-xs'>
                  <CiLink size={20} />
                  Linked
                </div>
              </div>
              <div className='flex items-center gap-2 cursor-pointer'>
                <MdFacebook className='text-blue-500' size={26} />
                <div className='flex items-center gap-2 text-blue-400 text-xs'>
                  <CiLink size={20} />
                  Linked
                </div>
              </div>
              <div className='flex items-center gap-2 cursor-pointer'>
                <FaXTwitter size={26} />
                <div className='flex items-center gap-2 text-blue-400 text-xs'>
                  <CiLink size={20} />
                  Linked
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          
        </div>
      </div>
      <div className='w-8/12 h-screen bg-white shadow-lg rounded-md'></div>
    </div>
  )
}

export default AdminProfile