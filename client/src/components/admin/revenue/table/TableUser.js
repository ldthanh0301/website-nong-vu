import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { DonHangContext } from "../../../../contexts/DonHangContext";
import axios from "axios";
import { apiUrl } from "../../../../contexts/constants";
import { VND } from "../../../../utils/format";

function TableUser(props) {
  const {year, month} = props;
 
  const getOrderGroupByUserAndMonth = ()=> {
    axios.get(`${apiUrl}/donhang/donhangnguoidungtheothang`).then(res=> {
      setOrders(res.data.orders)
    })
  }
  // get data
  useEffect( () => {
   getOrderGroupByUserAndMonth();
  },[]);

  const [datas, setDatas] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    let newDatas = orders.filter(data => {
      if  (data.nam == year && data.thang ==month) {
        return data
      }
    })
    setDatas(newDatas)
    console.log("new data ", newDatas)
  },[orders,year,month])
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Điạ chỉ</th>
            <th>Tên đăng nhập</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {
            datas.map((data,index) => (<tr>
              <td>{index+1}</td>
              <td>{data.hoTen}</td>
              <td>{data.diaChi}</td>
              <td>{data.taiKhoan}</td>
              <td>{VND.format(data.thanhTien)}</td>
            </tr>)) 
          }
        </tbody>
      </Table>
    </div>
  );
}

export default TableUser;
