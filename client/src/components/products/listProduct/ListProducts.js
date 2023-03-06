import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import SingleProductUser from '../SingleProductUser'

function ListProducts(props) {
    const {products} = props
  return (
    <div>
        <Row className="row-cols-2 row-cols-md-4 g-4 mx-auto mt-3">
          
          {products.map((product) => (
            <Col key={product.msvt} className="my-2">
              <SingleProductUser vatTu={product} />
            </Col>
          ))}
        </Row>
    </div>
  )
}

export default ListProducts