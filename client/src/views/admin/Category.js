import React, { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { CategoryContext } from "../../contexts/CategoryContext";
import Table from 'react-bootstrap/Table';
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Button from "react-bootstrap/esm/Button";
import addIcon from '../../assets/plus-circle-fill.svg'
import Tooltip from "react-bootstrap/esm/Tooltip";
import AddCategoryModal from "../../components/categories/AddCategoryModal";
import Actionbuttons from "../../components/categories/Actionbuttons";
import UpdateCategoryModal from "../../components/categories/UpdateCategoryModal";
import Toast from "react-bootstrap/esm/Toast";

function Category() {
  const {
    categoryState: { category, categories, categoriesLoading },
    getCategories,
    setShowAddCategoryModal,
    setShowToast,
    showToast:{show,message,type}
  } = useContext(CategoryContext);

  useEffect(() => {getCategories()}, []);

  let body = null;

  if (categoriesLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" varient="info"></Spinner>
      </div>
    );
  } else if (categories.length > 0) {
    body = (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên danh mục</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category,index) => (
              <tr key={category.mslvt}>
                <td>{index + 1}</td>
                <td>{category.tenLoaiVatTu}</td>
                <td><Actionbuttons _id={category.mslvt}></Actionbuttons></td>
              </tr>
            ))}
            
          </tbody>
        </Table>

        {/* open add post modal */}
        <OverlayTrigger placement='left' overlay={<Tooltip>Thêm danh mục mới</Tooltip>}>
            <Button className="btn-floating" onClick={setShowAddCategoryModal.bind(this,true)}>
              <img src={addIcon} alt="add post" width='60' height='60' />
            </Button>
        </OverlayTrigger>
      </>
    );
  } else {
    body = <span>Danh mục trống</span>;
  }
  return <>
    {body}
    <AddCategoryModal></AddCategoryModal> 
    {category !== null && <UpdateCategoryModal/>}
    <Toast
      show={show} 
      className={`bg-${type} text-white`}
      style={{ position: 'fixed', top: '20%', right: '10px' }}
      onClose={setShowToast.bind(this,{show:false,message:'',type:null})}
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{type}</strong>
        <small>Now</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  </>;
}

export default Category;
