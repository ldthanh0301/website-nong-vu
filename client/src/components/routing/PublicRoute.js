import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";
import NavbarMenu from "../Navbar/NavbarMenu";
import SidebarMenuUser from "../layout/SidebarMenuUser";
import Footer from "../layout/footer/Footer";
import Breadcrumbs from "../layout/Breadcrumbs";

function PublicRoute({component: Component, ...props}) {
   
    return ( 
        <>
            <NavbarMenu/>
            <Breadcrumbs></Breadcrumbs>
            <main>
                <Container fluid>
                <Outlet></Outlet>
                </Container>
            </main>

            <Footer></Footer>

        </> 
         )
}

export default PublicRoute;
