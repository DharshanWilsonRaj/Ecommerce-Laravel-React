import React from 'react'

const DashBoard = ({ isLoggedIn }) => {
    return (
        <div>DashBoard {isLoggedIn ? 1 : 2}</div>
    )
}

export default DashBoard
