import { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/esm/Table";
import { DonHangContext } from "../../contexts/DonHangContext";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useSearchParams } from "react-router-dom";
import Pagination from "../../components/layout/pagination/Pagination";
import TableOrder from "../../components/admin/order/TableOrder";


function DonHang() {
  // contexts
  let {orderState:{orders},getOrders,changeState} = useContext(DonHangContext)
  
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=> {
    getOrders(status)
    setCurrentPage(1)
  },[status])

 
  let body = null;

  const PageSize = 10;
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentOrders = orders.slice(firstPageIndex, lastPageIndex);
  body = (
      <>
        <div>
          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            totalPage={Math.ceil(orders.length / PageSize)}
          ></Pagination>
          <div>Tổng số lượng: {orders.length}</div>
        </div>
        <TableOrder orders={currentOrders} changeState={changeState}></TableOrder>
      </>
    );
  return (
    <div >
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
