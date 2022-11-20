import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import NavbarMenu from "../Navbar/NavbarMenu";
import SidebarMenuUser from "../layout/SidebarMenuUser";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";

function ProtectedRouteUser({component: Component, ...props}) {
    const {authState: {authLoading, isAuthenticated}}= useContext(AuthContext)
    if (authLoading)
    return (
        <div className="spinner-container">
            <Spinner animation="border" variant="info"/>
        </div>
    )
    return (isAuthenticated ? 
        <>
            <NavbarMenu/>
            <Row>
                <Col lg="3">
                    <SidebarMenuUser/>
                </Col>
                <Col>
                    <Outlet />
                </Col>
            </Row>
        </> 
        : <Navigate to='/dangnhap'/>     )
}

export default ProtectedRouteUser;
