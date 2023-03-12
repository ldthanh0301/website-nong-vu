import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Table from 'react-bootstrap/esm/Table'
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from '../contexts/AuthContext'
import { CartContext } from '../contexts/CartContext'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import CartRow from "../components/table/CartRow"
import { VND } from '../utils/format'
import { KhuyenMaiContext } from '../contexts/KhuyenMaiContext'
import ModalKhuyenMai from '../components/modals/ModalKhuyenMai'
import FormInfoOrder from '../components/form/FormInfoOrder'
import SidebarMenuUser from '../components/Sidebar/SidebarMenuUser'
function Cart() {
  const {
    cartState: { cart,cartLoading}, 
    deleteProductInCart,
    datHang,
    khuyenMaiInCart,
    showToast:{ show, message, type},
    setShowToast
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
          <ModalKhuyenMai></ModalKhuyenMai>
          {
            khuyenMaiInCart ? <div>Khuyến mãi:{khuyenMaiInCart.tenKM}</div>:""
          }
          <div>Tổng tiền: {VND.format(cart.tongTien)}</div>
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
      <ToastContainer   className="p-3" position={'middle-center'}>
          <Toast show={show} onClose={setShowToast.bind(this,{show:false,message:'',type:null})}>
            <Toast.Header closeButton={true}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Thông báo</strong>
              <small>Ngay bây giời</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
    </>
    
  )
}

export default Cart