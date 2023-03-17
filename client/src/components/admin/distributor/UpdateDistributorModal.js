import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { apiUrl } from "../../../contexts/constants";
import ToastMessage from "../../layout/toast/Toast";

function UpdateDistributorModal(props) {
  const { closeModal, distributor } = props;

  const [tenNCC, setTenNCC] = useState(distributor.tenNCC);
  const [diaChi, setDiaChi] = useState(distributor.diaChi);
  const [soDienThoai, setSoDienThoai] = useState(distributor.soDienThoai);

  const [msg, setMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e)=> {
    e.preventDefault();

    axios.put(apiUrl+"/nhacungcap/"+distributor.msncc,{tenNCC,diaChi,soDienThoai})
      .then(res=> {
        setShowToast(true)
        setMsg("thành công")
        closeModal()
      })
    }
  return (
    <>
      <Modal show={true} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật nhà cung cấp </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Tên nhà cung cấp"
                name="tenNCC"
                required
                aria-describedby="title-help"
                value={tenNCC}
                onChange={(e)=>setTenNCC(e.target.value)}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Địa chỉ"
                name="diaChi"
                required
                aria-describedby="title-help"
                value={diaChi}
                onChange={(e)=>setDiaChi(e.target.value)}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="tel"
                placeholder="Số điện thoại"
                name="soDienThoai"
                required
                aria-describedby="title-help"
                value={soDienThoai}
                onChange={(e)=>setSoDienThoai(e.target.value)}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Thêm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastMessage show={showToast} closeToast={()=>setShowToast(false)} msg={msg}></ToastMessage>
    </>
  );
}

export default UpdateDistributorModal;
