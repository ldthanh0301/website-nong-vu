import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';

function SibebarManager
() {
  return (
    <div>
        <ListGroup as="ul">
            <ListGroup.Item>
                <NavLink to="./donhang" className="list-group-item">Đơn hàng</NavLink> 
            </ListGroup.Item>
            <ListGroup.Item>
                <NavLink to="./vattu" className="list-group-item">Vật tư</NavLink> 
            </ListGroup.Item>
            <ListGroup.Item>
                <NavLink to="./danhmuc" className="list-group-item">Danh mục</NavLink> 
            </ListGroup.Item>
            <ListGroup.Item>
                <NavLink to="./muavu" className="list-group-item">Mùa vụ</NavLink> 
            </ListGroup.Item>
            <ListGroup.Item>
                <NavLink to="./khuyenmai" className="list-group-item">Khuyến mãi</NavLink> 
            </ListGroup.Item>
            <ListGroup.Item>
                <NavLink to="./nhacungcap" className="list-group-item">Nhà cung cấp</NavLink> 
            </ListGroup.Item>
            <ListGroup.Item>
                <NavLink to="./tinnhan" className="list-group-item">Tin nhấn</NavLink> 
            </ListGroup.Item>
        </ListGroup>
    </div>
  )
}

export default SibebarManager
