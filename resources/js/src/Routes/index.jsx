
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Protected from './Protected'

import AuthLayout from '../Pages/Auth/Layout/AuthLayout'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import DashBoard from '../Pages/Admin/Dashboard/DashBoard'

import DashboardLayout from '../Pages/Admin/DashboardLayout/DashboardLayout'
import Products from '../Pages/Admin/Products/Products'
import AddProducts from '../Pages/Admin/Products/Add/AddProducts'
import EditProduct from '../Pages/Admin/Products/Edit/EditProduct'
import Profile from '../Pages/Admin/Profile/Profile'
import Orders from '../Pages/Admin/Orders/Orders'
import Home from '../Pages/Customers/Home/Home'
import Cart from '../Pages/Customers/Cart/Cart'
import ProductsPage from '../Pages/Customers/Products/Products'
import CustomerProfile from '../Pages/Customers/CustomerProfile/CustomerProfile'
import CustomerOrders from '../Pages/Customers/Orders/Orders'

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
    const data = useSelector(state => state.auth);
    console.log(data, "data");
    return (
        <Routes>

            <Route path='/' element={<Protected access={role_id !== 1} fallback='/admin/dashboard' />} >
                <Route index element={<Home />} />
                <Route element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='products' element={<ProductsPage />} />
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
                        <Route path='edit/:id' element={<EditProduct />} />
                    </Route>
                    <Route path='orders' element={<Orders />} />
                    <Route path='profile' element={<Profile />} />
                </Route>
            </Route>

            {/* logged customer routes */}
            <Route path='/' element={<Protected access={isLoggedIn && role_id === 2} fallback='/' />}>
                <Route element={<AuthLayout />}>
                    <Route path='profile' element={<CustomerProfile />} />
                    <Route path='orders' element={<CustomerOrders />} />
                </Route>
            </Route>
            {/* No page */}
            <Route path='*' element={<NoPage />} />
        </Routes >

    )
}
export default AppRoutes
