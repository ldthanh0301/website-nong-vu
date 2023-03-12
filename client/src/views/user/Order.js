import React, { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import { NavLink, useSearchParams } from "react-router-dom";
import PaginationOrder from "../../components/layout/pagination/Pagination";
import TableOrder from "../../components/user/table/TableOrder";
import { DonHangContext } from "../../contexts/DonHangContext";
import { VND } from "../../utils/format";

function Order() {
  let {
    orderState: { orders },
    getOrderByUser,
    filterOrderUserByStatus
  } = useContext(DonHangContext);
  //pagination

  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 10;
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentOrders  = orders.slice(firstPageIndex, lastPageIndex)

  const handleSelectStatus = (status) => {
    status = parseInt(status)
    setCurrentPage(1)
    if (status ===-1) {
      getOrderByUser()
    }else {
      filterOrderUserByStatus(status)
    }
  }
  useEffect(() => {
    getOrderByUser();
  }, []);

  let body = null;
  
  // body
  body = (
    <>
      <h3> Danh sách các đơn hàng</h3>
      <PaginationOrder
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
        totalPage={Math.ceil(orders.length/PageSize)}
      />  
      <TableOrder orders={currentOrders}></TableOrder>
    </>
  );

  return (
    <div className="container">
    

      <DropdownButton id="dropdown-basic-button" variant="success" title="Hiển thị theo" onSelect={handleSelectStatus}>
        <Dropdown.Item eventKey="-1">Tất cả</Dropdown.Item>
        <Dropdown.Item eventKey="0">Chưa duyệt</Dropdown.Item>
        <Dropdown.Item eventKey="1">Đã duyệt</Dropdown.Item>
        <Dropdown.Item eventKey="2">Đã giao</Dropdown.Item>
      </DropdownButton>
      {body}
    </div>
  );
}

export default Order;
