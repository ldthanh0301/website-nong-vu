import React, { useContext, useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { CategoryContext } from "../../contexts/CategoryContext";
import { DonHangContext } from "../../contexts/DonHangContext";
import { VND } from "../../utils/format";

function Expense() {
  const {
    categoryState: { categories },
    getCategories,
  } = useContext(CategoryContext);
  let {
    orderState: { orders },
    filterOrderUserByCategory,
  } = useContext(DonHangContext);
  const [selectValueCategory, setSelectValueCategory] = useState("all");

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    filterOrderUserByCategory(selectValueCategory);
    console.log("order:", orders)
  }, [selectValueCategory]);
  return (
    <div>
      <center>
        <h2>Chi phí nông vụ</h2>
      </center>
      <h4>Chi phí theo danh mục:</h4>
      <div>
        <Form.Select
          size="sm"
          style={{ width: "400px" }}
          value={selectValueCategory}
          onChange={(e) => setSelectValueCategory(e.target.value)}
        >
          <option value="all">Tất cả</option>
          {categories.map((category) => (
            <option value={category.mslvt} key={category.mslvt}>
              {category.tenLoaiVatTu}
            </option>
          ))}
        </Form.Select>
        <p>Tổng chi phí : {VND.format(orders.reduce((accumulator, order) => accumulator + order.tongGia,0))} </p>
        <Table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên vật tư</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Tổng giá</th>
              <th>Ngày đặt hàng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{order.tenVatTu}</td>
                <td>{order.soLuong}</td>
                <td>{VND.format(order.gia)}</td>
                <td>{VND.format(order.tongGia)}</td>
                <td>{order.ngayDH}</td>
              </tr> 
            ))}
          </tbody>
        </Table>
      </div>

    </div>
  );
}

export default Expense;
