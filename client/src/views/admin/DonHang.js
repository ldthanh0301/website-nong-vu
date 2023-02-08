import { useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/esm/Table";
import { DonHangContext } from "../../contexts/DonHangContext";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useSearchParams } from "react-router-dom";


function DonHang() {
  // contexts
  let {orderState:{orders},getOrders,changeState} = useContext(DonHangContext)
  
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status');

  useEffect(()=> {
    getOrders(status)
  },[status])

  const handleChange = (msdh,e) => {
    let state = e.target.value;
    changeState(state, msdh)

  }
  let body = null;


  body = (
      <>
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
                    <td>{order.diaChi}</td>
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
      </>
    );
  return (
    <div style={{padding:"25px 25px"}}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Hiển thị theo
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="?">Tất cả</Dropdown.Item>
          <Dropdown.Item href="?status=0">Chưa duyệt</Dropdown.Item>
          <Dropdown.Item href="?status=1">Đã duyệt</Dropdown.Item>
          <Dropdown.Item href="?status=2">Đã giao</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <hr />
      {body}
    </div>
  )
}

export default DonHang;
