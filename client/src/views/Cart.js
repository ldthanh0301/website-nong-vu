import React, { useContext, useEffect } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from '../contexts/AuthContext'
import { CartContext } from '../contexts/CartContext'

function Cart() {
  const {authState: { user}} = useContext(AuthContext)
  const {cartState: { cart,cartLoading}, getCart} = useContext(CartContext)
  useEffect(()=>{
    getCart(user._id)
  },[])
  let body= null;

  if (cartLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" varient="info">
        </Spinner>
      </div>
    );
  } else {
    body = (
    <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
      {
      cart.products.map(product=> (
        <Col key={product._id} className="my-2">
          <h3>{product.productId.name}</h3>
        </Col>
      ))
      }
    </Row>
    )
  }
  
  return (
    <div>
      {body}
    </div>
  )
}

export default Cart