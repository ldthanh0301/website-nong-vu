import React from 'react'
import { Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { VND } from '../../../utils/format';

function TableOrder(props) {
    const {orders} = props;
  return (
    <>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Ngày đặt hàng</th>
            <th>Trạng thái</th>
            <th>Tổng tiền</th>
            <th>Chi tiết đơn hàng</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.ngayDH}</td>
              <td>
                {(() => {
                  switch (order.trangThai) {
                    case 0:
                      return "Chưa duyệt";
                    case 1:
                      return "Đã duyệt";
                    case 2:
                      return "Đã giao";
                    default:
                      break;
                  }
                })()}
              </td>
              <td>{VND.format(order.tongTien)}</td>
              <td>
                <NavLink to={`./chitietdonhang/${order.msdh}`}>
                  Chi Tiết
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default TableOrder