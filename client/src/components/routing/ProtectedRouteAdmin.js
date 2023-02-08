import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import NavbarMenu from "../admin/layout/NavbarMenu"
function ProtectedRouteAdmin({component: Component, ...props}) {
    const {authState: {authLoading, isAuthenticated, user}}= useContext(AuthContext)
    if (authLoading)
    return (
        <div className="spinner-container">
            <Spinner animation="border" variant="info"/>
        </div>
    )
    return (isAuthenticated && user.quanLy ===1  ? <><NavbarMenu/><Outlet /></> : <Navigate to='../dangnhap'/>     )
}

export default ProtectedRouteAdmin;
