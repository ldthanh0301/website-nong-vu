import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { AuthContext } from '../../contexts/AuthContext'

function FormInfoOrder(props) {
    const {datHang} = props
    const {authState:{user}} = useContext(AuthContext)

    const handleSubmit = (e) =>{
        e.preventDefault();
        let address = e.target.elements.address.value;
        let phone = e.target.elements.phone.value;
        datHang({address,phone})
    }
  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <legend>Thông tin đặt hàng</legend>
            <Form.Group className="mb-3" controlId="address">
                <Form.Label>Địa chỉ giao hàng</Form.Label>
                <Form.Control type="text" placeholder="Nhập địa chỉ"defaultValue={user.diaChi} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type="tel" placeholder="Nhập số điện thoại" defaultValue={user.soDienThoai} />
            </Form.Group>
            <hr />
            <Button variant="primary" type="submit" >
                Đặt hàng
            </Button>
        </Form>
    </div>
  )
}

export default FormInfoOrder