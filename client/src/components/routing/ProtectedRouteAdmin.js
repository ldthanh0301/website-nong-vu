import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import NavbarMenu from "../admin/layout/NavbarMenu"
import Sibebar from "../admin/layout/sidebar/Sibebar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";


function ProtectedRouteAdmin({component: Component, ...props}) {
    const {authState: {authLoading, isAuthenticated, user}}= useContext(AuthContext)
    if (authLoading)
    return (
        <div className="spinner-container">
            <Spinner animation="border" variant="info"/>
        </div>
    )
    return (
        isAuthenticated && user.quanLy ===1  ? 
        
        <>
            <NavbarMenu/>
            <Container fluid>
                <Row>
                    <Col lg="3">
                        <Sibebar></Sibebar>
                    </Col>
                    <Col  lg="9">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </> 
        : <Navigate to='../dangnhap'/>    
    )
}

export default ProtectedRouteAdmin;
