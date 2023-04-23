import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { apiUrl } from "../../../contexts/constants";
import { toast } from "react-toastify";

function AddAccountModal(props) {
  const {getAccounts} = props

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    soDienThoai: "",
    hoTen: "",
    diaChi: "",
  });
  const { username, password, confirmPassword, soDienThoai, hoTen, diaChi } =
    registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert("Mật khẩu xác nhận sai");
    }

    try {
        // goi api create account
        const res = await axios.post(apiUrl+"/taikhoan/captaikhoan",registerForm)
        console.log("tạo tài khoản: ",res)
        if (res.data.success) {
            toast.success("Tạo tài khoản thành công")
            getAccounts()
            setShowModal(false)
        } else {
            toast.error("Lỗi khi tạo tài khoản")
        }
    } catch (error) {
      setAlert(error.response.data.message)
      toast.error("Lỗi khi tạo tài khoản")
      console.log(error);
    }
  };
  const resetData = () => {
    setAlert(null)
    setRegisterForm({
      username: "",
      password: "",
      confirmPassword: "",
      soDienThoai: "",
      hoTen: "",
      diaChi: "",
    });
  };
  return (
    <div>
      <Button
        onClick={() => {
          setShowModal(true);
          resetData();
        }}
      >
        Thêm tài khoản
      </Button>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          resetData();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm tài khoản mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            alert ? <p style={{ color: "#f3969a" }}>{alert}</p>:null
          }
          <Form className="my-4" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Tài khoản"
                name="username"
                required
                value={username}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                name="password"
                required
                value={password}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Xác nhận mật khẩu"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Số điện thoai"
                name="soDienThoai"
                required
                value={soDienThoai}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Họ và tên"
                name="hoTen"
                required
                value={hoTen}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Địa chỉ"
                name="diaChi"
                required
                value={diaChi}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <hr />
            <Button variant="success" type="submit">
              Tạo tài khoản
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddAccountModal;
