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
import { faker } from "@faker-js/faker";
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
      text: "Doanh thu của trang web",
    },
  },
};

const labels = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export const ordersData = {
  labels,
  datasets: [
    {
      label: "Doanh thu theo tháng",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default function Chart(props) {
  const { year } = props;

  const [dataYear, setDataYear] = useState({
    labels,
    datasets: [
      {
        label: `Doanh thu theo tháng năm ${year}`,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  const {
    orderState: { orders },
    getOrdersChecked,
  } = useContext(DonHangContext);
  useEffect(() => {
    getOrdersChecked();
  }, []);

  useEffect(() => {
    // kiểm tra độ dài đơn hàng
    if (orders.length) {
      console.log("chayj");
      // lấy theo năm
      let ordersYear = orders;
      ordersYear = orders.filter((order) => {
        if (parseInt(order.ngayDH.split("/")[2]) === parseInt(year))
          return order;
      });
      //lấy trường tong tien và ngày
      let datas = ordersYear.map((order) => {
        return { tongTien: order.tongTien, ngay: order.ngayDH };
      });

      // tạo mảng tháng
      let data = [];
      for (let index = 1; index <= 12; index++) {
        data.push({ thang: index, tong: 0 });
      }
      // tính tổng theo tháng
      data.forEach((th, index) => {
        datas.forEach((e) => {
          if (e.ngay.split("/")[1] == th.thang) {
            let tong = e.tongTien;
            data[index] = { ...data[index], tong: tong + data[index].tong };
          }
        });
      });

      //Lấy tổng
      let tong = data.map((e) => e.tong);


      ordersData.datasets[0].data = tong;
      setDataYear({
        labels,
        datasets: [
          {
            label:  `Doanh thu theo tháng năm ${year}`,
            data: tong,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    }
  }, [orders, year]);

  return <Bar options={options} data={dataYear} />;
}
