import React from 'react'
import { Form, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function ListOrder(props) {
    let {orders,changeState} = props;
    const handleChange = (msdh,e) => {
        let state = e.target.value;
        changeState(state, msdh)
      }
  return (
    <div>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Địa chỉ</th>
            <th>Ngày đặt hàng</th>
            <th>Trạng thái</th>
            <th>Chi tiết đơn hàng</th>
            </tr>
        </thead>
        <tbody>
            {
                orders.map((order, index) => (
                    <tr key={index}>
                    <td>{index+1}</td>
                    <td>{order.hoTen}</td>
                    <td>{order.diaChiGiaoHang}</td>
                    <td>{order.ngayDH}</td>
                    <td>
                    <Form.Select aria-label="Default select example"
                        onChange={(e) => handleChange(order.msdh,e)}
                        defaultValue={order.trangThai}
                    >
                      <option value="0">Chưa duyệt</option>
                      <option value="1" >Đã duyệt</option>
                      <option value="2" >Đã giao</option>
                    </Form.Select>
                    </td>
                    <td>
                      <NavLink to={`./chitietdonhang/${order.msdh}`}>
                        Chi Tiết
                      </NavLink>
                    </td>
                    </tr>
                ))
            }
        </tbody>
        </Table>
    </div>
  )
}

export default ListOrder