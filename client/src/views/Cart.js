import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Table from 'react-bootstrap/esm/Table'
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from '../contexts/AuthContext'
import { CartContext } from '../contexts/CartContext'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Cart() {
  const {authState: { user}} = useContext(AuthContext)
  const {
    cartState: { cart,cartLoading}, 
    getCart,
    deleteProductInCart,
    datHang,
    showToast:{ show, message, type},
    setShowToast
  } = useContext(CartContext)
  useEffect(()=>{
    getCart(user.msnd)
    
  },[])

  let body= null;

  if (cartLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" varient="info">
        </Spinner>
      </div>
    );
  } else  if (cart.products.length==0){
      body= (
        <div>
          <h3>Giỏ hàng trống</h3>
        </div>
      ) 
  }else {
    body = (
      <div>
        <Table striped bordered >
          <thead>
          <tr>
            <th>STT</th>
            <th>Tên vật tư</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
        {
        cart.products.map((product,index)=> (
          <tr key={index}>
            <td>{index + 1 }</td>
            <td>{product.tenVatTu}</td>
            <td>{product.gia}</td>
            <td>{product.soLuong}</td>
            <td>
              <Button onClick={()=> {deleteProductInCart(product.msctgh)}}>Xóa</Button>  
            </td>
          </tr>
        ))
        }
        </tbody>
        </Table>
        <Button onClick={()=>{datHang()}}>Đặt hàng</Button>
      </div>
    )
  }
  
  return (
    <>
      <div style={{padding: "30px 30px"}}>
        {body}
      </div>
      <ToastContainer   className="p-3" position={'middle-center'}>
          <Toast show={show} onClose={setShowToast.bind(this,{show:false,message:'',type:null})}>
            <Toast.Header closeButton={true}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
    </>
    
  )
}

export default Cart