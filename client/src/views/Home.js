import Toast from "react-bootstrap/esm/Toast";
import React, { useContext, useEffect, useMemo, useState } from 'react'
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
import Breadcrumbs from "../components/layout/Breadcrumbs"
import Footer from "../components/layout/footer/Footer";
import PaginationProduct from "../components/layout/pagination/Pagination";
import ListProducts from "../components/layout/listProduct/ListProducts";


function Home() {
  // context
  const {
    productState:{products,productsLoading},
    getProducts
  } = useContext(ProductContext)
  
  const {  showToast:{show, message, type}, setShowToast} = useContext(CartContext)
 
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 8;

  useEffect(() => {getProducts()},[])

  let body = null;

  if (productsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" varient="info">
          
        </Spinner>
      </div>
    );
  } else if (products.length>0) {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const currentProducts  = products.slice(firstPageIndex, lastPageIndex)
    body =(
      <>
      <PaginationProduct
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
        totalPage={Math.ceil(products.length/PageSize)}
      />     
      <ListProducts products ={ currentProducts}/>
      </>
    )
  }
  return (<>
    <Row>
        <Col lg="3">    
          <SidebarMenuUser/>  
        </Col>
        <Col lg="9">
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
  )
}

export default Home