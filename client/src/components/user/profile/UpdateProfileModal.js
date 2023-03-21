import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthContext';
import { apiUrl } from '../../../contexts/constants';

function UpdateProfileModal() {
    const {authState:{user},loadUser}= useContext(AuthContext)
    const [hoTen, setHoTen] = useState(user.hoTen);
    const [soDienThoai, setSoDienThoai] = useState(user.soDienThoai);
    const [diaChi, setDiaChi] = useState(user.diaChi);
    const [showUpdateModal,setShowUpdateModal] = useState(false)
    const handlerSubmit = function (e) {
        e.preventDefault()
        const info = { taiKhoan: user.taiKhoan,hoTen, soDienThoai, diaChi};
        axios.put(apiUrl+'/taikhoan/capnhat',info)
        .then(res=> {
            if (res.data.success){
                toast.success("Thành công");
            } else {
                toast.error("Lỗi ");
            }
            loadUser()
            setShowUpdateModal(false)
        })
    }
  return (
    <div>
        <Button onClick={()=>{setShowUpdateModal(true)}}>Chỉnh sửa</Button>

        <Modal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin cá nhân</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlerSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Tên khách hàng"
                name="hoTen"
                required
                aria-describedby="title-help"
                value={hoTen}
                onChange={(e) => setHoTen(e.target.value)}
              />
              <Form.Text id="title-help" muted>
                Bất buộc 
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Địa chỉ khách hàng"
                name="diaChi"
                required
                aria-describedby="title-help"
                value={diaChi}
                onChange={(e) => setDiaChi(e.target.value)}
              />
              <Form.Text id="title-help" muted>
                Bất buộc
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="tel"
                placeholder="Số điện thoai"
                name="soDienThoai"
                required
                aria-describedby="title-help"
                value={soDienThoai}
                onChange={(e) => setSoDienThoai(e.target.value)}
              />
              <Form.Text id="title-help" muted>
                Bất buộc
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Hủy</Button>
            <Button variant="primary" type="submit">
              Cập nhật
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default UpdateProfileModal