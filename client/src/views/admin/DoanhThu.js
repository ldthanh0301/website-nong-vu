import React, { useState } from "react";
import Chart from "../../components/admin/charts/Chart.js";
import { Form } from "react-bootstrap";
import ChartMonth from "../../components/admin/charts/ChartMonth.js";
import TableUser from "../../components/admin/revenue/table/TableUser.js";

function DoanhThu() {
  const [selectYear, setSelectYear] = useState("2023");
  const [selectMonth, setSelectMonth] = useState(
    new Date().getMonth() + 1 + ""
  );
  const handleSelectYear = (e) => {
    setSelectYear(e.target.value);
  };
  const handleSelectMonth = (e) => {
    setSelectMonth(e.target.value);
  };

  // option tháng
  let optionMonth = [];
  for (let index = 1; index <= 12; index++) {
    optionMonth.push(
      <option value={index} selected={index == selectMonth}>
        {index}
      </option>
    );
  }
  return (
    <div>
      <h2>Thống kê doanh thu</h2>

      <div>
        <div style={{ width: "200px" }}>
          <label htmlFor="selectYear">Chọn năm hiển thị</label>
          <Form.Select
            id="selectYear"
            aria-label="Default select example"
            onChange={handleSelectYear}
          >
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </Form.Select>
        </div>
        <Chart year={selectYear}></Chart>
      </div>
      <hr />
      <div>
        <div style={{ width: "200px" }}>
          <label htmlFor="selectYear">Hiển thị chi tiết theo tháng</label>
          <Form.Select
            id="selectMonth"
            aria-label="Default select example"
            onChange={handleSelectMonth}
          >
            {optionMonth}
          </Form.Select>
        </div>
        <ChartMonth year={selectYear} month={selectMonth}></ChartMonth>
      </div>
      <hr />
      <div>
        <label htmlFor="selectYear">
          Danh sách người dùng mua nhiều nhất của tháng {selectMonth}
        </label>
        <TableUser year={selectYear} month={selectMonth}></TableUser>
      </div>
    </div>
  );
}

export default DoanhThu;
