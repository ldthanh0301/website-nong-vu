import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { apiUrl } from "../../../contexts/constants";
import { toast } from 'react-toastify';

function AddDistributorModal(props) {
  const { closeModal,getDistributorList } = props;

  const [tenNCC, setTenNCC] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [moTa, setMoTa] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");

  const handleSubmit = (e)=> {
    e.preventDefault();

    axios.post(apiUrl+"/nhacungcap",{tenNCC,diaChi,soDienThoai,moTa})
      .then(res=> {
        toast.success("Thành công")
        getDistributorList()
        closeModal()
      })
    }
  return (
    <>
      <Modal show={true} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm nhà cung cấp mới</Modal.Title>
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
                type="text"
                placeholder="Mô tả"
                name="moTa"
                required
                aria-describedby="title-help"
                value={moTa}
                onChange={(e)=>setMoTa(e.target.value)}
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
    </>
  );
}

export default AddDistributorModal;
