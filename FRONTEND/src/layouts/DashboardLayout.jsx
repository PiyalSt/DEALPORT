import React from 'react'
import DashboardSideNavbar from '../components/DashboardSideNavbar'
import DashboardTopNavbar from '../components/DashboardTopNavbar'

const DashboardLayout = () => {
  return (
    <div className='w-full h-screen flex'>
      <div className='w-2/12 h-full'>
        <DashboardSideNavbar />
      </div>
      <div className='w-10/12 h-screen bg-red-200'>
        <div className='py-4'>
          <DashboardTopNavbar />
        </div>
        <div>Outlet</div>
      </div>
    </div>
  )
}

export default DashboardLayout