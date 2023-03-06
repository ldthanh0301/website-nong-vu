import React, { useContext, useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CartContext } from "../../contexts/CartContext";
import { KhuyenMaiContext } from "../../contexts/KhuyenMaiContext";

function ModalKhuyenMai() {
  const {themKMVaoDonHang} = useContext(KhuyenMaiContext)
  const {tinhGiaKM} = useContext(CartContext)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    khuyenMaiState: { danhSachKhuyenMai, khuyenMaiLoading },
    getDSKhuyenMai,
  } = useContext(KhuyenMaiContext);

  useEffect(() => {
    getDSKhuyenMai();
  }, []);

  let body = null;

  if (khuyenMaiLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" varient="info"></Spinner>
      </div>
    );
  } else {
    body = (
      <Row>
        {danhSachKhuyenMai.map((km) => (
          <div key={km.mskm} className="col-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{km.tenKM}</h5>
                <span className="card-subtitle mb-2 text-muted">
                  Giá trị: {km.giaTriKM}%
                </span>
                <p className="card-text">Ngày bất đầu: {km.ngayBD}</p>
                <p className="card-text">Ngày kết thúc: {km.ngayKT}</p>
                <Button onClick={()=>{
                  tinhGiaKM(km)
                  handleClose()
                  }}>Chọn</Button>
              </div>
            </div>
          </div>
        ))}
      </Row>
    );
  }
  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Chọn mã giảm giá
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Các khuyến mãi hiện tại</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary">Chọn</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalKhuyenMai;
