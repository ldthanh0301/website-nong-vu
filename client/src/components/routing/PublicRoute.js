import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Container from 'react-bootstrap/Container';
import NavbarMenu from "../Navbar/NavbarMenu";
import Footer from "../layout/footer/Footer";
import Breadcrumbs from "../layout/breadcrumbs/Breadcrumbs";
import ChatUser from "../chat/ChatUser";

function PublicRoute({component: Component, ...props}) {
    const {authState: {authLoading, isAuthenticated, user}}= useContext(AuthContext)
    const navigate = useNavigate()

    return ( 
        <>
            {
                isAuthenticated && user.quyen ===1 ? navigate("/admin"): null
            }
            <header>
                <NavbarMenu/>
                <Breadcrumbs></Breadcrumbs>
            </header>
            <main>
                <Container fluid>
                    <Outlet></Outlet>
                </Container>
            </main>
            {isAuthenticated ? <ChatUser/> : null}
            <Footer></Footer>
        </> 
         )
}

export default PublicRoute;
