import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Table from 'react-bootstrap/esm/Table'
import { CartContext } from '../contexts/CartContext'
import CartRow from "../components/table/CartRow"
import { VND } from '../utils/format'
import FormInfoOrder from '../components/form/FormInfoOrder'

function Cart() {
  const {
    cartState: { cart}, 
    deleteProductInCart,
    datHang,
    khuyenMaiInCart,
  } = useContext(CartContext)
  let body= null;
  if (cart.products.length==0){
      body= (
        <div>
          <h3>Giỏ hàng trống</h3>
        </div>
      ) 
  }else {
    body = (
      <div>
        <h3>Giỏ hàng của bạn</h3>
        <Table striped bordered >
          <thead>
          <tr>
            <th>STT</th>
            <th>Tên vật tư</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng giá</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
        {
        cart.products.map((product,index)=> (
          <CartRow key={index} product={product} index={index} deleteProductInCart={deleteProductInCart}/>
         
        ))
        }
        </tbody>
        </Table>
        <div>
          <hr />
          {
            khuyenMaiInCart ? <div>Khuyến mãi: <span style={{color:"#ed6363"}}>{khuyenMaiInCart.tenKM}</span></div>:""
          }
          <div>Tổng tiền: <span style={{color:"#ed6363"}}>{VND.format(cart.tongTien)}</span> </div>
          <hr />
        </div>
      </div>
    )
  }
  
  return (
    <>
      <div style={{padding: "30px 30px"}}>
        <Row>
        <Col lg="8">    
          {body}  
        </Col>
        <Col lg="4">
          <FormInfoOrder datHang={datHang}></FormInfoOrder>
        </Col>
        </Row>
      </div>
    </>
  )
}

export default Cart