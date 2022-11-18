import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CategoryContext } from "../../contexts/CategoryContext";

function UpdateCategoryModal() {
  const { 
    categoryState: {category},
    showUpdateCategoryModal, 
    setShowUpdateCategoryModal,
    updateCategory,
    setShowToast,
    } = useContext(CategoryContext);
  const [updateData, setUpdateData] = useState(category);

  useEffect(() => setUpdateData(category), [category])

  const {tenLoaiVatTu} = updateData;

  const onChangeUpdateCategoryForm = (e) => {
    setUpdateData({...updateData, [e.target.name]: e.target.value})
  }
  const handlerSubmit = async (e) => {
    e.preventDefault()
    const {success, message} = await updateCategory(updateData);
      setShowUpdateCategoryModal(false)
      setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
  }

  return (
    <>
      <Modal
        show={showUpdateCategoryModal}
        onHide={() => setShowUpdateCategoryModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật danh mục</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlerSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Tên danh mục"
                name="tenLoaiVatTu"
                required
                aria-describedby="title-help"
                value={tenLoaiVatTu}
                onChange={onChangeUpdateCategoryForm}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Hủy</Button>
            <Button variant="primary" type="submit">
              Thêm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateCategoryModal;
