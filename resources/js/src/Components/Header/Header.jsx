import React, { useCallback, useRef } from 'react'
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { setAuth } from '@/src/Store/Auth/AuthSlice';

const Header = () => {
    const { isLoggedIn = false, token } = useSelector(state => state.auth);
    const location = useLocation();
    const logoutRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate()

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
                    token: null
                }))
                navigate('/')
            }
        } catch (error) {
            console.log(error.message);
        }

    }, [dispatch, navigate, token]);

    return (
        <div className='header_container'>
            <div className=" d-flex  align-items-center p-3 px-5 " >
                <NavLink to={"/"} className={'logo_heading'}> <h3 className="logo_heading fs-3 fw-bold">Ecommerce</h3></NavLink>
                <div className="ms-auto ">
                    <ul className="d-flex gap-3 navbar ">
                        <li><NavLink to={"/"} className={`fw-bold ${location.pathname === "/" && 'active'}`}>Home</NavLink> </li>
                        <li><NavLink to={"/products"} className={`fw-bold ${location.pathname === "/products" && 'active'}`}>Product</NavLink> </li>
                        <li><NavLink to={"/cart"} className={`fw-bold ${location.pathname === "/cart" && 'active'}`}>Cart</NavLink> </li>

                        {
                            isLoggedIn ? <>
                                <li><NavLink to={'/profile'} className={`fw-bold ${location.pathname === "/profile" && 'active'}`}>Profile</NavLink> </li>
                                <li>
                                    <span className='menu_option_item' onClick={handleLogout} style={{ cursor: "pointer" }}>
                                        <FontAwesomeIcon icon={faArrowRightFromBracket} className='option_icon' />
                                    </span>
                                </li>
                                <img src="" alt="" width="40px" className="rounded-circle" />
                            </> :
                                <>
                                    <li><NavLink to={'/login'} className={`fw-bold ${location.pathname === "/login" && 'active'}`}>SignIn</NavLink> </li>
                                    <li><NavLink to={'/register'} className={`fw-bold ${location.pathname === "/register" && 'active'}`}>SignUp</NavLink> </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Header
