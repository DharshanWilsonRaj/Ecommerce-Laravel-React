import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Protected from './Protected'
import Home from '../Pages/Customers/Home'


const AppRoutes = () => {
    const { isLoggedIn = false } = useSelector(state => state.auth)

    return (
        <Routes>
            <Route path='/' element={<Protected access={!!isLoggedIn} fallback='/' />} >
                <Route index element={<Home />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
