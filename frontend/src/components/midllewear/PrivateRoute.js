import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoute = ()=>{
    const token = localStorage.getItem('user_token')

    return token ? <Outlet /> : <Navigate to='/signup'/>
}

export default PrivateRoute