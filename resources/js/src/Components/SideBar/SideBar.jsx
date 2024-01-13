import { setAuth } from '@/src/Store/Auth/AuthSlice';
import { faArrowRightFromBracket, faChartLine, faStore, faTruckFast, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import './SideBar.scss'
const SideBar = () => {

    const logoutRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()
    const { token } = useSelector(state => state.auth);

    const handleLogout = useCallback(async () => {
        const result = await Swal.fire({
            text: "Are you sure you want to logout?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
        })
        if (result.isDismissed) return;

        try {
            if (logoutRef.current) {
                logoutRef.current.abort();
            }
            logoutRef.current = new AbortController();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                signal: logoutRef.current.signal
            }
            const response = await axios.post(`${window.base_path}/logout`, {}, config);
            const json = response.data;
            if (json.success) {
                dispatch(setAuth({
                    login: false,
                    token: null,
                    role_id: 2,
                }))
                navigate('/')
            }
        } catch (error) {
            console.log(error.message);
        }

    }, [dispatch, navigate, token]);

    return (
        <div className='sidebar_container '>
            <ul >
                <NavLink to={'/admin/dashboard'} className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`} >
                    <span className='mx-1 icon'><FontAwesomeIcon icon={faChartLine} /></span>Dashboard
                </NavLink>

                <NavLink to={'/admin/products'} className={`nav-link ${location.pathname === '/admin/products' ? 'active' : ''}`}  >
                    <span className='mx-1 icon'><FontAwesomeIcon icon={faStore} /></span>Products
                </NavLink>

                <NavLink to={'/admin/orders'} className={`nav-link ${location.pathname === '/admin/orders' ? 'active' : ''}`} >
                    <span className='mx-1 icon'><FontAwesomeIcon icon={faTruckFast} /></span>Orders
                </NavLink>

                <NavLink to={'/admin/profile'} className={`nav-link ${location.pathname === '/admin/profile' ? 'active' : ''}`} >
                    <span className='mx-1 icon'><FontAwesomeIcon icon={faUserTie} /></span>Profile</NavLink>
                <span className='nav-link ' onClick={handleLogout} style={{ cursor: "pointer" }}>
                    <span className=' mx-1 icon'> <FontAwesomeIcon icon={faArrowRightFromBracket}  /></span>  Logout
                </span>
            </ul>
        </div >
    )
}

export default SideBar
