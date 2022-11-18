import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MuaVuContext } from "../../contexts/MuaVuContext";

function AddMuaVuModal() {
  const { 
    showAddMuaVuModal, 
    setShowAddMuaVuModal, 
    addMuaVu, 
  } = useContext(MuaVuContext);
  const [tenMuaVu, setTenMuaVu] = useState("");
  const [nam, setNam] = useState("");

  const handlerSubmit = async (e) => {
    e.preventDefault()
    const {success, message} = await addMuaVu({tenMuaVu,nam});
    setTenMuaVu('')
    setShowAddMuaVuModal(false)
  }

  return (
    <>
      <Modal
        show={showAddMuaVuModal}
        onHide={() => setShowAddMuaVuModal(false)}
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
                name="tenMuaVu"
                required
                aria-describedby="title-help"
                value={tenMuaVu}
                onChange={(e) => setTenMuaVu(e.target.value)}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Năm"
                name="nam"
                required
                aria-describedby="title-help"
                value={nam}
                onChange={(e) => setNam(e.target.value)}
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

export default AddMuaVuModal;
