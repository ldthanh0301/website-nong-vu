import { useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/esm/Table";
import { DonHangContext } from "../../contexts/DonHangContext";



function DonHang() {
  // contexts
  let {orderState:{orders},getOrders} = useContext(DonHangContext)
  
  useEffect(()=> {
    getOrders()
  },[])
  
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
            </tr>
        </thead>
        <tbody>
            {
                orders.map((order, index) => (
                    <tr>
                    <td>{index+1}</td>
                    <td>{order.hoTen}</td>
                    <td>{order.diaChi}</td>
                    <td>{order.ngayDH}</td>
                    <td>{order.trangThai}</td>
                    </tr>
                ))
            }
        </tbody>
        </Table>
      </>
    );
  return <>
   {body}
  </>;
}

export default DonHang;
