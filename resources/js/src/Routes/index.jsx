import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Protected from './Protected'
import Home from '../Pages/Customers/Home'
import AuthLayout from '../Pages/Auth/Layout/AuthLayout'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import DashBoard from '../Pages/Admin/Dashboard/DashBoard'
import Cart from '../Pages/Customers/Cart'
import DashboardLayout from '../Pages/Admin/DashboardLayout/DashboardLayout'
import Products from '../Pages/Admin/Products/Products'
import AddProducts from '../Pages/Admin/Products/Add/AddProducts'

// const DashboardLayout = lazy(() => import('../Pages/Admin/DashboardLayout/DashboardLayout'))


const NoPage = () => {
    return (
        <>
            <h4 className='fw-bold text-center my-5'>404 Page not found</h4>
        </>
    )
}

const AppRoutes = () => {
    const { isLoggedIn = false, role_id } = useSelector(state => state.auth);

    return (
        <Routes>
            <Route path='/' element={<Protected access={role_id !== 1} fallback='/admin/dashboard' />} >
                <Route index element={<Home />} />
                <Route element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='register' element={<Register />} />
                </Route>
            </Route>

            {/* Admin Page Routes */}
            <Route path='/admin' element={<Protected access={isLoggedIn && role_id === 1} fallback='/' />}>
                <Route element={<DashboardLayout />}>
                    <Route path='dashboard' element={<DashBoard />} />
                    <Route path='products'>
                        <Route index element={<Products />} />
                        <Route path='add' element={<AddProducts />} />
                    </Route>
                    <Route path='orders' element={<h6>Orders</h6>} />
                    <Route path='profile' element={<h6>Profile</h6>} />
                </Route>
            </Route>

            {/* No page */}
            <Route path='*' element={<NoPage />} />
        </Routes >

    )
}
export default AppRoutes
