import React from 'react'

import './Dashboard.scss';
import Linechart from '@/src/Images/linechart.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp, faClipboardList, faStore, faTruckFast, faUsers } from '@fortawesome/free-solid-svg-icons'
const DashBoard = () => {
    return (
        <div className='dashboard_container ' >
            <h5 className='fw-bold mt-2'>Recent Activity</h5>
            <div className="d-flex mt-2 gap-1">
                <div className="flex-fill text-white d-flex justify-content-between border rounded p-2 shadow-sm" style={{ backgroundColor: '#FF7347' }}>
                    <div className='d-flex flex-column'>
                        <span className='fw-light'>Total Products </span>
                        <span className='fw-bold fs-3 mt-2'>12030 </span>
                    </div>
                    <div className='d-flex align-items-center flex-column'>
                        <span className=' fs-6'>23.3% <FontAwesomeIcon icon={faArrowTrendUp} /></span>
                        <span className='   fs-3 mt-2'><FontAwesomeIcon icon={faStore} /></span>
                    </div>
                </div>
                <div className="flex-fill text-white d-flex justify-content-between border rounded p-2 shadow-sm" style={{ backgroundColor: '#5F47D3' }}>
                    <div className='d-flex flex-column'>
                        <span className='fw-light '>Total Customer </span>
                        <span className='fw-bold fs-3 mt-2'>1340 </span>
                    </div>
                    <div className='d-flex align-items-center flex-column'>
                        <span className=' fs-6'>13.1% <FontAwesomeIcon icon={faArrowTrendUp} /></span>
                        <span className=' fw-light fs-3 mt-2'><FontAwesomeIcon icon={faUsers} /></span>
                    </div>
                </div>
                <div className="flex-fill text-white d-flex justify-content-between border rounded p-2 shadow-sm" style={{ backgroundColor: '#14d9a0' }}>
                    <div className='d-flex flex-column'>
                        <span className='fw-light '>Total Orders </span>
                        <span className='fw-bold fs-3 mt-2'>200 </span>
                    </div>
                    <div className='d-flex align-items-center flex-column'>
                        <span className=' fs-6'>3.2% <FontAwesomeIcon icon={faArrowTrendUp} /></span>
                        <span className='   fs-3 mt-2'><FontAwesomeIcon icon={faClipboardList} /></span>
                    </div>
                </div>
                <div className="flex-fill text-white d-flex justify-content-between border rounded p-2 shadow-sm" style={{ backgroundColor: '#147BFF' }}>
                    <div className='d-flex flex-column'>
                        <span className='fw-light '>Total Delivered </span>
                        <span className='fw-bold fs-3 mt-2'>90 </span>
                    </div>
                    <div className='d-flex align-items-center flex-column'>
                        <span className=' fs-6'>43.3% <FontAwesomeIcon icon={faArrowTrendUp} /></span>
                        <span className='   fs-3 mt-2'><FontAwesomeIcon icon={faTruckFast} /></span>
                    </div>
                </div>
            </div>
            <h5 className='fw-bold my-2'>Top Sales</h5>
            <div className='d-flex  align-items-start gap-3 mt-2 border p-2 py-3 rounded shadow-sm'>
                <div className="d-flex flex-column gap-5">
                    <div className="flex-fill  d-flex justify-content-between " style={{ minWidth: "200px" }}>
                        <div className='d-flex flex-column'>
                            <span className='fw-light' style={{ color: '#9e9d9d' }}>New Orders</span>
                            <span className='fw-bold fs-6'>90 </span>
                        </div>
                        <div className='d-flex align-items-center flex-column'>
                            <span className=' fs-6 mt-4 text-primary'>43.3% <FontAwesomeIcon icon={faArrowTrendUp} /></span>

                        </div>
                    </div>
                    <div className="flex-fill  d-flex justify-content-between " >
                        <div className='d-flex flex-column'>
                            <span className='fw-light' style={{ color: '#9e9d9d' }}>Total Revenue  </span>
                            <span className='fw-bold fs-6'>$3,499.00 </span>
                        </div>
                        <div className='d-flex align-items-center flex-column'>
                            <span className=' fs-6 mt-4 text-primary'>2.1% <FontAwesomeIcon icon={faArrowTrendUp} /></span>

                        </div>
                    </div>
                    <div className="flex-fill  d-flex justify-content-between " >
                        <div className='d-flex flex-column'>
                            <span className='fw-light' style={{ color: '#9e9d9d' }}>Average  Revenue  </span>
                            <span className='fw-bold fs-6'>$2,168.00 </span>
                        </div>
                        <div className='d-flex align-items-center flex-column'>
                            <span className=' fs-6 mt-4 text-primary'>1.1% <FontAwesomeIcon icon={faArrowTrendUp} /></span>

                        </div>
                    </div>
                </div>
                <div className='d-flex w-100 gap-3'>
                    <img src={Linechart} alt="" className='img-fluid chart_img' style={{ maxHeight: "400px" }} />
                    {/*
                    {/* <img src={ChartBarGIf} alt="" className='img-fluid chart_img' style={{ maxHeight: "400px" }} />
                    <img src={Chartline} alt="" className='img-fluid chart_img' style={{ maxHeight: "400px" }} /> */}
                </div>

            </div>
        </div>

    )
}

export default DashBoard
