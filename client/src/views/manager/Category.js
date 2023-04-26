import React, { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { CategoryContext } from "../../contexts/CategoryContext";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Button from "react-bootstrap/esm/Button";
import addIcon from "../../assets/plus-circle-fill.svg";
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
    showToast: { show, message, type },
  } = useContext(CategoryContext);

  useEffect(() => {
    getCategories();
  }, []);

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
        <div>Tổng số lượng: {categories.length}</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên danh mục</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.mslvt}>
                <td>{index + 1}</td>
                <td>{category.tenLoaiVatTu}</td>
                <td>
                  <Actionbuttons _id={category.mslvt}></Actionbuttons>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  } else {
    body = <span>Danh mục trống</span>;
  }
  return (
    <>
      <h3>Danh mục sản phẩm</h3>
      <hr />

      <Button
        className="btn"
        onClick={setShowAddCategoryModal.bind(this, true)}
      >
        Thêm mới
      </Button>
      {body}
      <AddCategoryModal></AddCategoryModal>
      {category !== null && <UpdateCategoryModal />}
    </>
  );
}

export default Category;
