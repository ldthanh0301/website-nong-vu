import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";
import NavbarMenu from "../Navbar/NavbarMenu";
import Breadcrumbs from "../layout/breadcrumbs/Breadcrumbs";
import Footer from "../layout/footer/Footer";
import ChatAdmin from "../chat/ChatAdmin";

function ProtectedRouteUser({component: Component, ...props}) {
    const {authState: {authLoading, isAuthenticated,user}}= useContext(AuthContext)
    if (authLoading)
    return (
        <div className="spinner-container">
            <Spinner animation="border" variant="info"/>
        </div>
    )
    return (isAuthenticated ? 
        <>
            <header>
                <NavbarMenu/>
                <Breadcrumbs type="user"></Breadcrumbs>
            </header>
            <main>
                <Container fluid>
                    <Row>
                        <Col>
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer></Footer>
            <ChatAdmin></ChatAdmin>
        </> 
        : <Navigate to='/dangnhap'/>     )
}

export default ProtectedRouteUser;
