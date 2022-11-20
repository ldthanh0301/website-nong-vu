import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import { ProductContext } from "../contexts/ProductContext";
import SingleProductUser from "../components/products/SingleProductUser";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Spinner from "react-bootstrap/esm/Spinner";
import { useSearchParams } from "react-router-dom";
import NavbarMenu from "../components/Navbar/NavbarMenu";
import SidebarMenuUser from "../components/layout/SidebarMenuUser";

function VatTu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mslvt = searchParams.get('mslvt');

  // context
  const {
    productState:{products,productsLoading},
    getProducts,
    findByMslvt
  } = useContext(ProductContext)
  

  
  useEffect(()=>{
    if(mslvt){
      findByMslvt(mslvt)
    }else {
      getProducts()
    }
  },[mslvt])

  let body = null;
  if (productsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" varient="info">
        </Spinner>
      </div>
    );
  } else if (products.length>0) {
    body =(
      <>
      {
        <Row className="row-cols-1 row-cols-md-4 g-4 mx-auto mt-3">
          
          {products.map((product) => (
            <Col key={product.msvt} className="my-2">
              <SingleProductUser product={product} />
            </Col>
          ))}
        </Row>
      }
      </>
    )
  } 

  return (
    <>
      <NavbarMenu/>
      <Row>
        <Col lg="3">
          <SidebarMenuUser/>
        </Col>
        <Col>
          {body}
        </Col>
      </Row>
    </>
  );
}

export default VatTu;
