import React from 'react'
import ChartBarGIf from '@/src/Images/chart_bar.gif'
import Chartline from '@/src/Images/chart_group_bar.gif'
import './Dashboard.scss'
const DashBoard = () => {
    return (
        <div className='dashboard_container ' >
            <div className="d-flex mt-4 gap-1">
                <div className="flex-fill d-flex flex-column border rounded p-2 shadow-sm">
                    <span className='fs-5'>No of products</span>
                    <span className='fw-bold fs-3'>90</span>
                </div>
                <div className="flex-fill  d-flex flex-column border rounded p-2 shadow-sm">
                    <span className='fs-5 '>No of Customer</span>
                    <span className='fw-bold fs-3'>30</span>
                </div>
                <div className="flex-fill  d-flex flex-column border rounded p-2 shadow-sm">
                    <span className='fs-5'>No of Orders</span>
                    <span className='fw-bold fs-3'>10</span>
                </div>
                <div className="flex-fill d-flex flex-column border rounded p-2 shadow-sm">
                    <span className='fs-5'>No of Delivered</span>
                    <span className='fw-bold fs-3'>3</span>
                </div>
            </div>
            <div className='d-flex gap-2 mt-4'>
                <img src={ChartBarGIf} alt="" className='img-fluid chart_img' style={{ maxHeight: "400px"}} />
                <img src={Chartline} alt="" className='img-fluid chart_img' style={{ maxHeight: "400px"}} />
            </div>
        </div>

    )
}

export default DashBoard
