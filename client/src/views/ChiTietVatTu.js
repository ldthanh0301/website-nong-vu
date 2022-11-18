import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Spinner from 'react-bootstrap/esm/Spinner'
import { useParams } from 'react-router-dom'
import SidebarMenuUser from '../components/layout/SidebarMenuUser'
import NavbarMenu from '../components/Navbar/NavbarMenu'
import { apiUrl } from '../contexts/constants'
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
    body = <div style={{display:'flex', padding:25}}>
      <img 
        width="520px" 
        src={apiUrl+"/"+product.diaChiHinh} 
        alt="ảnh sản phẩm"
        style={{border:"1px solid green"}}/>
      <div
        style={{padding: 25}}  
      >
        <h3>{product.tenVatTu}</h3>
        <span 
          style={{
            color:'red',
            fontSize:18
          }}>{product.gia}</span>
        <p
          style={{
            fontSize:18
          }}
        >{product.moTa}</p>
        <Button>Mua ngay</Button>
      </div>
    </div>
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
  )
}

export default ChiTietVatTu