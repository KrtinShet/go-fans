import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function AuthWrapper({ to }) {

    const auth = useAuth();

    if (to === "creator") {
        if (auth?.userId && auth?.userRole === 'publisher') {
            return (
                <Outlet />
            )
        } else {
            return (
                <Navigate to=".." />
            )
        }
    }

    if (auth?.userId) {
        return (
            <Outlet />
        )
    } else {
        return (
            <Navigate to="/login" />
        )
    }
}

export default AuthWrapper