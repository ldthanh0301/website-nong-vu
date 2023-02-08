import Toast from "react-bootstrap/esm/Toast";
import React, { useContext, useEffect } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Spinner from 'react-bootstrap/esm/Spinner'
import SidebarMenuUser from '../components/layout/SidebarMenuUser'
import Panner from '../components/layout/Panner'
import Carousel from '../components/layout/Carousel'
import NavbarMenu from '../components/Navbar/NavbarMenu'
import SingleProductUser from '../components/products/SingleProductUser'
import { CartContext } from '../contexts/CartContext'
import { ProductContext } from '../contexts/ProductContext'
import Breadcrumb from "../components/layout/Breadcrumb"
import Footer from "../components/layout/footer/Footer";


function Home() {
  // context
  const {
    productState:{product,products,productsLoading},
    setShowAddProductModal,
    getProducts
  } = useContext(ProductContext)
  
  const {  showToast:{show, message, type}, setShowToast} = useContext(CartContext)
  // const {authState: { user}} = useContext(AuthContext)
  // const {getCart} = useContext(CartContext)
  // useEffect(()=>{
  //   getCart(user.msnd)
  // },[])
  //state 
  useEffect(()=>{
    getProducts()
  },[])

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
  return (<>
    {/* <Carousel></Carousel> */}
    <NavbarMenu/>
    <main>
      <Row>
        <Col lg="3">
          <SidebarMenuUser/>
        </Col>
        <Col>
          <Breadcrumb></Breadcrumb>
          {body}
        </Col>
      </Row>
    </main>
    <Footer></Footer>
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
  )
}

export default Home