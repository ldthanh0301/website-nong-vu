import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

function Sibebar() {
  return (
    <div>
        <ListGroup as="ul">
            <ListGroup.Item action href="./donhang">
               Đơn hàng
            </ListGroup.Item>
            <ListGroup.Item action href="./vattu">
                Vật tư
            </ListGroup.Item>
            <ListGroup.Item action href="./categories" >
                Danh mục
            </ListGroup.Item>
            <ListGroup.Item action href="./muavu">
                Mùa vụ
            </ListGroup.Item>
            <ListGroup.Item action href="./khuyenmai">
                Khuyến mãi
            </ListGroup.Item>
        </ListGroup>
    </div>
  )
}

export default Sibebar