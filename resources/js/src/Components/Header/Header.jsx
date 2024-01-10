import React from 'react'
import './Header.scss'
import { useSelector } from 'react-redux';
const Header = () => {
    const { isLoggedIn = false } = useSelector(state => state.auth);
    return (
        <div className='header_container'>
            <div class=" d-flex text-white align-items-center p-3 px-5 " >
                <h3 class=" fs-3 fw-bold">Ecommerce</h3>
                <div class="ms-auto ">
                    <ul class="d-flex gap-3 navbar ">

                        <li><a href="/" class="fw-bold ">Home</a> </li>
                        <li><a href="/cart" class="fw-bold ">Cart</a> </li>

                        {
                            isLoggedIn && <>
                                <li><a href="/" class="fw-bold ">Profile</a> </li>
                                <li><a href="/" class="fw-bold ">Logout</a> </li>
                                <img src="" alt="" width="40px" class="rounded-circle" />
                            </>
                        }


                        {/* UnAuthenticate Routes */}
                        <li><a href="/login" class="fw-bold ">SignIn</a> </li>
                        <li><a href="/register" class="fw-bold ">SignUp</a> </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Header
