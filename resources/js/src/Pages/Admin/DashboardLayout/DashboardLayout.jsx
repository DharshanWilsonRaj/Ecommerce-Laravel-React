import SideBar from '@/src/Components/SideBar/SideBar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import './DashboardLayout.scss';
import AvatharImage from '@/src/Images/Avatar-Profile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
const DashboardLayout = () => {
    return (
        <div className='dashboard_layout_container'>
            <div className='header shadow-sm mb-1'>
                <h6 className=' text-center fs-4 fw-bold '>Ecommerce</h6>
                <div className='ms-auto me-2 d-flex  align-items-center gap-2'>
                    <span className='text-secondary fs-5 mx-2'><FontAwesomeIcon icon={faBell} /></span>
                    <span><img src={AvatharImage} alt="" width={"30px"} /></span><span className=''>Admin</span>
                </div>
            </div>

            <div className='d-flex'>
                <SideBar />
                <div className='d-flex flex-column w-100'>
                    {/* <div className='header  px-2'>
                    <h6 className='text-white fs-4 fw-bold '>Ecommerce</h6>
                    <div className='ms-auto me-2'><h5 className=' text-end text-white'>Admin</h5></div>
                </div> */}
                    <div className='px-2'>
                        <Outlet />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DashboardLayout
