import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Protected from './Protected'
import Home from '../Pages/Customers/Home'
import AuthLayout from '../Auth/Layout/AuthLayout'
import Login from '../Auth/Login'
import Register from '../Auth/Register'


const AppRoutes = () => {
    const { isLoggedIn = false } = useSelector(state => state.auth);

    return (
        <Routes>
            <Route path='/' element={<Protected access={!isLoggedIn} fallback='/' />}>
                <Route element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>
            </Route>
            <Route path='/' >
                <Route index element={<Home />} />
            </Route>
        </Routes>
    )
}
export default AppRoutes
