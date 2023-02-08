import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import SingleProductUser from "../components/products/SingleProductUser";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Spinner from "react-bootstrap/esm/Spinner";
import { useSearchParams } from "react-router-dom";
import NavbarMenu from "../components/Navbar/NavbarMenu";
import SidebarMenuUser from "../components/layout/SidebarMenuUser";
import { CartContext } from "../contexts/CartContext";
import Toast from "react-bootstrap/esm/Toast";
import Breadcrumb from "../components/layout/Breadcrumb"
function VatTu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mslvt = searchParams.get('mslvt');

  // context
  const {
    productState:{products,productsLoading},
    getProducts,
    findByMslvt
  } = useContext(ProductContext)
  
  const {  showToast:{show, message, type}, setShowToast} = useContext(CartContext)

  
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
              <SingleProductUser vatTu={product} />
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
          <Breadcrumb></Breadcrumb>
          {body}
        </Col>
      </Row>
      <Toast
      show={show} 
      className={`bg-${type} text-white`}
      style={{ position: 'fixed', top: '20%', right: '10px' }}
      onClose={setShowToast.bind(this,{show:false,message:'',type:null})}
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{type}</strong>
        <small>Now</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
    </>
  );
}

export default VatTu;
