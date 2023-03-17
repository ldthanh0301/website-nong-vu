import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";
import NavbarMenu from "../Navbar/NavbarMenu";
import SidebarMenuUser from "../Sidebar/SidebarMenuUser";
import Footer from "../layout/footer/Footer";
import Breadcrumbs from "../layout/Breadcrumbs";
import Chat from "../chat/Chat";

function PublicRoute({component: Component, ...props}) {
    const {authState: {authLoading, isAuthenticated, user}}= useContext(AuthContext)
    const navigate = useNavigate()

    return ( 
        <>
            {
                isAuthenticated && user.quyen ===1 ? navigate("/admin"): null
            }
            <NavbarMenu/>
            <Breadcrumbs></Breadcrumbs>
            <main>
                <Container fluid>
                <Outlet></Outlet>
                </Container>
            </main>

            <Footer></Footer>
            <Chat userType={"User"}></Chat>

        </> 
         )
}

export default PublicRoute;
