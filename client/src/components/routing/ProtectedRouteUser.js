import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";
import NavbarMenu from "../Navbar/NavbarMenu";
import Breadcrumbs from "../layout/Breadcrumbs";
import Footer from "../layout/footer/Footer";

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
            <NavbarMenu/>
            <Breadcrumbs></Breadcrumbs>
            <main>
                <Container>
                    <Row>
                        <Col>
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer></Footer>
        </> 
        : <Navigate to='/dangnhap'/>     )
}

export default ProtectedRouteUser;
