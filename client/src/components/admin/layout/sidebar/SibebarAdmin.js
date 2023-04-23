import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';

function SibebarManager
() {
  return (
    <div>
        <ListGroup as="ul">
            <ListGroup.Item>
                <NavLink to="./taikhoan" className="list-group-item">Tài khoản</NavLink> 
            </ListGroup.Item>
            <ListGroup.Item>
                <NavLink to="./doanhthu" className="list-group-item">Doanh thu</NavLink> 
            </ListGroup.Item>
        </ListGroup>
    </div>
  )
}

export default SibebarManager
