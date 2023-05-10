import React, { useContext, useEffect, useMemo, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Spinner from "react-bootstrap/esm/Spinner";
import { useSearchParams } from "react-router-dom";
import SidebarMenuUser from "../components/Sidebar/SidebarMenuUser";
import { CartContext } from "../contexts/CartContext";
import Toast from "react-bootstrap/esm/Toast";
import PaginationProduct from "../components/layout/pagination/Pagination";
import ListProducts from "../components/products/listProduct/ListProducts";

function VatTu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mslvt = searchParams.get("mslvt");

  // context
  const {
    productState: { products, productsLoading },
    getProducts,
    findByMslvt,
  } = useContext(ProductContext);

  const [currentPage, setCurrentPage] = useState(1);
  const {
    showToast: { show, message, type },
    setShowToast,
  } = useContext(CartContext);

  useEffect(() => {
    setCurrentPage(1);
    if (mslvt) {
      findByMslvt(mslvt);
    } else {
      getProducts();
    }
  }, [mslvt]);

  let body = null;
  const PageSize = 8;

  if (productsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" varient="info"></Spinner>
      </div>
    );
  } else if (products.length > 0) {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const currentProducts = products.slice(firstPageIndex, lastPageIndex);
    body = (
      <>
        <PaginationProduct
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPage={Math.ceil(products.length / PageSize)}
        />
        <ListProducts products={currentProducts} />
      </>
    );
  }

  return (
    <>
      <Row>
        <Col lg="3">    
          <SidebarMenuUser/>  
        </Col>
        <Col lg="9">
          {body}  
        </Col>
      </Row>
      <Toast
        show={show}
        className={`bg-${type} text-white`}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{type}</strong>
          <small>Now</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </>
  );
}

export default VatTu;
