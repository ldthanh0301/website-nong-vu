import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CategoryContext } from "../../contexts/CategoryContext";

function AddCategoryModal() {
  const { 
    showAddCategoryModal, 
    setShowAddCategoryModal, 
    addCategory, 
    setShowToast 
  } = useContext(CategoryContext);
  const [tenLoaiVatTu, setTenLoaiVatTu] = useState("");

  const handlerSubmit = async (e) => {
    e.preventDefault()
    const {success, message} = await addCategory(tenLoaiVatTu);
    setTenLoaiVatTu('')
    setShowAddCategoryModal(false)
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
  }

  return (
    <>
      <Modal
        show={showAddCategoryModal}
        onHide={() => setShowAddCategoryModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm danh mục mới</Modal.Title>
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
                onChange={(e) => setTenLoaiVatTu(e.target.value)}
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

export default AddCategoryModal;
