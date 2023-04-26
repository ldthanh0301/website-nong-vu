import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import addIcon from "../../assets/plus-circle-fill.svg";
import Tooltip from "react-bootstrap/esm/Tooltip";
import AddProductModal from "../../components/products/AddProductModal";
import { ProductContext } from "../../contexts/ProductContext";
import Spinner from "react-bootstrap/esm/Spinner";
import UpdateProductModal from "../../components/products/UpdateProductModal";
import { useSearchParams } from "react-router-dom";
import TableProduct from "../../components/admin/product/TableProduct";
import Pagination from "../../components/layout/pagination/Pagination";
import SearchAdmin from "../../components/admin/layout/search/SearchAdmin";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mslvt = searchParams.get("mslvt");
  const [currentPage, setCurrentPage] = useState(1);

  // context
  const {
    productState: { product, products, productsLoading },
    setShowAddProductModal,
    getProducts,
    deleteProduct,
    findProduct,
    setShowUpdateProductModal,
    filterProduct,
  } = useContext(ProductContext);
  const [listProduct, setListProduct] = useState(products);
  useEffect(() => {
    getProducts().then((data) => setListProduct(data));
  }, [products]);

  let body = null;
  if (productsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" varient="info"></Spinner>
      </div>
    );
  } else {
    const PageSize = 10;

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const currentProducts = listProduct.slice(firstPageIndex, lastPageIndex);
    body = (
      <>
        <div style={{ display: "flex" }}>
          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            totalPage={Math.ceil(listProduct.length / PageSize)}
          ></Pagination>
          <div style={{ flex: "1 1 0" }}>
            Tổng số lượng: {listProduct.length}
          </div>
          <SearchAdmin
            filterFunc={filterProduct}
            onChangeData={(data) => setListProduct(data)}
          ></SearchAdmin>
        </div>
        <TableProduct
          products={currentProducts}
          findProduct={findProduct}
          setShowUpdateProductModal={setShowUpdateProductModal}
          deleteProduct={deleteProduct}
        ></TableProduct>
      </>
    );
  }
  return (
    <>
      <h3>Quản lý vật tư</h3>
      <hr />
      <Button
        className="btn "
        onClick={setShowAddProductModal.bind(this, true)}
      >
        Thêm mới
      </Button>
      <hr />
      {body}
      <AddProductModal></AddProductModal>
      {product !== null && <UpdateProductModal></UpdateProductModal>}
    </>
  );
}

export default Product;
