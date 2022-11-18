import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import addIcon from "../../assets/plus-circle-fill.svg"
import editIcon from "../../assets/pencil.svg"
import deleteIcon from "../../assets/trash.svg"

import Tooltip from "react-bootstrap/esm/Tooltip";
import AddProductModal from "../../components/products/AddProductModal"
import { ProductContext } from "../../contexts/ProductContext";
import SingleProductUser from "../../components/products/SingleProductUser";
import Col from "react-bootstrap/esm/Col";
import Spinner from "react-bootstrap/esm/Spinner";
import UpdateProductModal from "../../components/products/UpdateProductModal";
import { useSearchParams } from "react-router-dom";
import Table from "react-bootstrap/esm/Table";
import { apiUrl } from "../../contexts/constants";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mslvt = searchParams.get('mslvt');

  // context
  const {
    productState:{product,products,productsLoading},
    setShowAddProductModal,
    getProducts,
    findByMslvt,
    deleteProduct,
    findProduct,
    setShowUpdateProductModal
  } = useContext(ProductContext)
  
  const handlerUpdate = (_id) => {
    findProduct(_id)
    setShowUpdateProductModal(true)
  }

  
  useEffect(()=>{
    if(mslvt){
      findByMslvt(mslvt)
    }else {
      getProducts()
    }
  },[mslvt])

  let body = null;
  if (productsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" varient="info">
          
        </Spinner>
      </div>
    );
  } else if (products.length>0) {
    body =(
      <>
      {
        <Table striped bordered hover style={{width:'1200px', margin: 'auto'}}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên vật tư</th>
              <th>Ảnh</th>
              <th>Giá</th>
              <th>Mô tả</th>
              <th>Số lượng</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {products.map((vatTu,index) => (
              <tr key={vatTu.msvt}>
                <td>{index + 1}</td>
                <td>{vatTu.tenVatTu}</td>
                <td>
                  <img src={apiUrl+"/"+vatTu.diaChiHinh} width='126px' alt="" srcset="" />
                </td>
                <td>{vatTu.Gia}</td>
                <td>{vatTu.moTa}</td>
                <td>{vatTu.soLuong}</td>
                <td>
                  <Button className="post-button" onClick={handlerUpdate.bind(this,vatTu.msvt)}>
                  <img src={editIcon} alt="edit" width="24" height="24" />
                  </Button>{" "}
                  <Button style={{float:'right'}} onClick={deleteProduct.bind(this,vatTu.msvt)}>
                      <img src={deleteIcon} alt="delete" width="24" height="24" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
        {/* open add product modal */}
        <OverlayTrigger placement='left' overlay={<Tooltip>Add new product!!</Tooltip>}>
            <Button className="btn-floating" onClick={setShowAddProductModal.bind(this,true)}>
              <img src={addIcon} alt="add post" width='60' height='60' />
            </Button>
        </OverlayTrigger>
      </>
    )
  } 
  else {
    body = (<>
      {/* open add product modal */}
      <OverlayTrigger placement='left' overlay={<Tooltip>Add new product!!</Tooltip>}>
            <Button className="btn-floating" onClick={setShowAddProductModal.bind(this,true)}>
              <img src={addIcon} alt="add post" width='60' height='60' />
            </Button>
        </OverlayTrigger>
    </>)
  }
  return (
    <>
      {body}
      <AddProductModal></AddProductModal>
      {product !== null && <UpdateProductModal></UpdateProductModal>}
    </>
  );
}

export default Product;
