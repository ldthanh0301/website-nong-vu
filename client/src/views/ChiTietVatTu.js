import React, { useContext, useEffect } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Spinner from 'react-bootstrap/esm/Spinner'
import { useParams } from 'react-router-dom'
import SidebarMenuUser from '../components/layout/SidebarMenuUser'
import NavbarMenu from '../components/Navbar/NavbarMenu'
import ProductDetail from '../components/products/product/ProductDetail'
import { ProductContext } from '../contexts/ProductContext'

function ChiTietVatTu() {
  const params = useParams()
  const productId = params.id
  const {
    productState:{
      product,
      productLoading
      },
      findProduct
    } = useContext(ProductContext)
  useEffect(()=>{
    findProduct(productId)
  },[productId])

  let body = null;

  if (productLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" varient="info">
        </Spinner>
      </div>
    );
  } else {
    body = (
      <ProductDetail
        product = {product}
      />
    )
  }
  return (
    <>
      <Row>
        <Col lg="3">
          <SidebarMenuUser/>
        </Col>
        <Col lg="9">
          {body}
        </Col>
      </Row>
    </>
  )
}

export default ChiTietVatTu