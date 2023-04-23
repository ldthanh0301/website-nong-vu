import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { KhuyenMaiContext } from "../../../../contexts/KhuyenMaiContext";

function UpdateKhuyenMai() {
  const {
    khuyenMaiState: { khuyenMai },
    showUpdateKhuyenMaiModal,
    setShowUpdateKhuyenMaiModal,
    setKhuyenMai,
    updateKhuyenMai,
  } = useContext(KhuyenMaiContext);
  const [updateData, setUpdateData] = useState(khuyenMai);
  const { tenKM, giaTriKM, ngayBD, ngayKT, dieuKien } = updateData;

  const onChangeUpdateCategoryForm = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    updateKhuyenMai(updateData);
    setShowUpdateKhuyenMaiModal(false);
    setKhuyenMai();
  };

  return (
    <>
      <Modal
        show={showUpdateKhuyenMaiModal}
        onHide={() => {
          setShowUpdateKhuyenMaiModal(false);
          setKhuyenMai();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm khuyến mãi mới</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlerSubmit}>
          <Modal.Body>
            <Form.Label>Tên khuyến mãi</Form.Label>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Tên khuyến mãi"
                name="tenKM"
                required
                aria-describedby="title-help"
                value={tenKM}
                onChange={onChangeUpdateCategoryForm}
              />
              <Form.Text id="title-help" muted>
                Bất buộc
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Giá trị khuyến mãi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Giá trị khuyến mãi"
                name="giaTriKM"
                required
                aria-describedby="title-help"
                value={giaTriKM}
                onChange={onChangeUpdateCategoryForm}
              />
              <Form.Text id="title-help" muted>
                Bất buộc
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Điều kiện khuyến mãi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Điều kiện được khuyến mãi"
                name="dieuKien"
                required
                aria-describedby="title-help"
                value={dieuKien}
                onChange={onChangeUpdateCategoryForm}
              />
              <Form.Text id="title-help" muted>
                Bất buộc
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ngày bất đầu khuyến mãi</Form.Label>
              <Form.Control
                type="date"
                placeholder="Ngày bất đầu"
                name="ngayBD"
                required
                aria-describedby="title-help"
                value={ngayBD}
                onChange={onChangeUpdateCategoryForm}
              />
              <Form.Text id="title-help" muted>
                MM/DD/YYYY
              </Form.Text>
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Ngày kết thúc khuyến mãi</Form.Label>
              <Form.Control
                type="date"
                placeholder="Ngày kết thúc"
                name="ngayKT"
                required
                aria-describedby="title-help"
                value={ngayKT}
                onChange={onChangeUpdateCategoryForm}
              />
              <Form.Text id="title-help" muted>
                MMDD/YYYY
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowUpdateKhuyenMaiModal(false);
                setKhuyenMai();
              }}
            >
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Cập nhật
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateKhuyenMai;
