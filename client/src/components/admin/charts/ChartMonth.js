import React, { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { DonHangContext } from "../../../contexts/DonHangContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Doanh thu theo tháng của trang web",
    },
  },
};

export default function ChartMonth(props) {
  const { year, month } = props;
  let labels=[]
  var today = new Date();
  var lastDayOfMonth = new Date(today.getFullYear(), month, 0).getDate();
  const {
    orderState: { orders },
    getOrdersChecked,
  } = useContext(DonHangContext);
  // get data
  useEffect(() => {
    getOrdersChecked();
  }, []);
  
  
  const [dataMonth, setDataMonth] = useState({
    labels,
    datasets: [
      {
        label: `Doanh thu của tháng ${month}`,
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
 

  useEffect(() => {
    // kiểm tra độ dài đơn hàng
    if (orders.length) {
      console.log("chayj");
      // lấy theo năm
      let ordersByYearAndMonth  = orders.filter((order) => {
        if (parseInt(order.ngayDH.split("/")[2]) === parseInt(year) && parseInt((order.ngayDH.split("/")[1])) ===parseInt(month))
          return order;
      });
      //lấy trường tong tien và ngày
      let datas = ordersByYearAndMonth.map((order) => {
        return { tongTien: order.tongTien, ngay: order.ngayDH };
      });

      // tạo mảng ngày
      let days = [];
      for (let index = 1; index <= lastDayOfMonth; index++) {
        days.push({ ngay: index, tong: 0 });
      }
      // tính tổng theo ngày
      days.forEach((day, index) => {
        datas.forEach((e) => {
          if (e.ngay.split("/")[0] == day.ngay) {
            let tong = e.tongTien;
            days[index] = { ...days[index], tong: tong + days[index].tong };
          }
        });
      });

      //Lấy tổng
      let tong = days.map((e) => e.tong);
      // set labels
      for (let index = 1; index <= lastDayOfMonth; index++) {
        labels.push(index+"")
      }

      setDataMonth({
        labels,
        datasets: [
          {
            label: `Doanh thu theo ngày của tháng ${month}`,
            data: tong,
            backgroundColor: "rgba(50, 168, 68, 1)",
          },
        ],
      });
    }
  }, [orders, year, month]);

  return <Bar options={options} data={dataMonth} />;
}
