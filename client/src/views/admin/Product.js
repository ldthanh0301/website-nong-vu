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

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mslvt = searchParams.get("mslvt");
  const [currentPage, setCurrentPage] = useState(1);

  // context
  const {
    productState: { product, products, productsLoading },
    setShowAddProductModal,
    getProducts,
    findByMslvt,
    deleteProduct,
    findProduct,
    setShowUpdateProductModal,
  } = useContext(ProductContext);

  useEffect(() => {
    if (mslvt) {
      findByMslvt(mslvt);
    } else {
      getProducts();
    }
  }, [mslvt]);

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
    const currentProducts = products.slice(firstPageIndex, lastPageIndex);
    body = (
      <>
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPage={Math.ceil(products.length / PageSize)}
        ></Pagination>
        <TableProduct 
          products={currentProducts}
          findProduct={findProduct}
          setShowUpdateProductModal={setShowUpdateProductModal}
          deleteProduct={deleteProduct}
        ></TableProduct>
      </>)      
  } 
  return (
    <>
      {body}
      <>
        {/* open add product modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Thêm sản phẩm mới!!</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddProductModal.bind(this, true)}
          >
            <img src={addIcon} alt="add post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
      <AddProductModal></AddProductModal>
      {product !== null && <UpdateProductModal></UpdateProductModal>}
    </>
  );
}

export default Product;
