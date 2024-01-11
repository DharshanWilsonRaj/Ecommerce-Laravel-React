import SideBar from '@/src/Components/SideBar/SideBar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import './DashboardLayout.scss'
const DashboardLayout = () => {
    return (
        <div className='dashboard_layout_container'>
            <SideBar />
            <div className='d-flex flex-column w-100'>
                <div className='header  px-2'>
                    <h6 className='text-white fs-4 fw-bold '>Ecommerce</h6>
                    <div className='ms-auto me-2'><h5 className=' text-end text-white'>Admin</h5></div>
                </div>
                <div className='px-2'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
