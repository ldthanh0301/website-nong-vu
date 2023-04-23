import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { KhuyenMaiContext } from "../../../../contexts/KhuyenMaiContext";

function AddKhuyenMaiModal() {
  const {
    showAddKhuyenMaiModal, 
    setShowAddKhuyenMaiModal,
    addKhuyenMai
  } = useContext(KhuyenMaiContext);

  const [tenKM, setTenKM] = useState("");
  const [giaTriKM, setGiaTriKM] = useState("");
  const [ngayBD,setNgayBD] = useState("");
  const [ngayKT,setNgayKT] = useState("");
  const [dieuKien,setDieuKien] = useState(0);


  const handlerSubmit = async (e) => {
    e.preventDefault()
    addKhuyenMai({tenKM,giaTriKM,ngayBD,ngayKT, dieuKien});
    setShowAddKhuyenMaiModal(false)
  }

  return (
    <>
      <Modal
        show={showAddKhuyenMaiModal}
        onHide={() => setShowAddKhuyenMaiModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm khuyến mãi mới</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlerSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Tên khuyến mãi"
                name="tenKM"
                required
                aria-describedby="title-help"
                value={tenKM}
                onChange={(e) => setTenKM(e.target.value)}
              />
              <Form.Text id="title-help" muted>
                Bất buộc 
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Giá trị khuyến mãi"
                name="giaTriKM"
                required
                aria-describedby="title-help"
                value={giaTriKM}
                onChange={(e) => setGiaTriKM(e.target.value)}
              />
              <Form.Text id="title-help" muted>
                Bất buộc
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Điều kiện được khuyến mãi"
                name="dieuKien"
                required
                aria-describedby="title-help"
                value={dieuKien}
                onChange={(e) => setDieuKien(e.target.value)}
              />
              <Form.Text id="title-help" muted>
                Bất buộc
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="date"
                placeholder="Ngày bất đầu"
                name="ngayBD"
                required
                aria-describedby="title-help"
                value={ngayBD}
                onChange={(e) => setNgayBD(e.target.value)}
              />
              <Form.Text id="title-help" muted>
                Bất buộc
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="date"
                placeholder="Ngày kết thúc"
                name="ngayKT"
                required
                aria-describedby="title-help"
                value={ngayKT}
                onChange={(e) => setNgayKT(e.target.value)}
              />
              <Form.Text id="title-help" muted>
                Bất buộc
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

export default AddKhuyenMaiModal;
