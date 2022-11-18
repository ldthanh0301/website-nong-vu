
import React, { useContext, useEffect } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Spinner from 'react-bootstrap/esm/Spinner'
import SidebarMenuUser from '../components/layout/SidebarMenuUser'
import NavbarMenu from '../components/Navbar/NavbarMenu'
import SingleProductUser from '../components/products/SingleProductUser'
import { ProductContext } from '../contexts/ProductContext'
function Home() {
  // context
  const {
    productState:{product,products,productsLoading},
    setShowAddProductModal,
    getProducts
  } = useContext(ProductContext)
  
  
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
              <SingleProductUser product={product} />
            </Col>
          ))}
        </Row>
      }
      </>
    )
  }
  return (<>
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
  )
}

export default Home