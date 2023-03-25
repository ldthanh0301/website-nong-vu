import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import NavbarMenu from "../admin/layout/navbar/NavbarMenu"
import Sibebar from "../admin/layout/sidebar/Sibebar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Footer from "../layout/footer/Footer";
import AdminPanner from "../admin/layout/panner/AdminPanner";
import ChatAdmin from "../chat/ChatAdmin";
import Breadcrumbs from "../layout/breadcrumbs/Breadcrumbs";


function ProtectedRouteAdmin({component: Component, ...props}) {
    const {authState: {authLoading, isAuthenticated, user}}= useContext(AuthContext)
    if (authLoading)
    return (
        <div className="spinner-container">
            <Spinner animation="border" variant="info"/>
        </div>
    )
    return (
        isAuthenticated && user.quyen ===1  ? 
        
        <>  
            <header>
                <NavbarMenu/>
                <Breadcrumbs type="admin"></Breadcrumbs>
            </header>
            <main>
                <AdminPanner/>
                <Container fluid style={{minHeight: '80vh'}}>
                    <Row>
                        <Col lg="3">
                            <Sibebar></Sibebar>
                        </Col>
                        <Col  lg="9" style={{padding:"25px 25px"}}>
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer></Footer>
            <ChatAdmin></ChatAdmin>

        </> 
        : <Navigate to='../dangnhap'/>    
    )
}

export default ProtectedRouteAdmin;
