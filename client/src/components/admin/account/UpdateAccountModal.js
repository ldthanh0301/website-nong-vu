import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { apiUrl } from "../../../contexts/constants";
import { toast } from "react-toastify";

function UpdateAccountModal(props) {
  const {accountInfo,getAccounts,showUpdateModal,setShowUpdateModal,type} = props
  console.log("accountInfo: ", accountInfo)
  const [alert, setAlert] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    username: accountInfo.taiKhoan,
    password: '',
    confirmPassword: "",
    soDienThoai: accountInfo.soDienThoai,
    hoTen: accountInfo.hoTen,
    diaChi: accountInfo.diaChi,
  });
  const { username, password, confirmPassword, soDienThoai, hoTen, diaChi } = updateForm;
    // console.log("updateForm: ", updateForm)

  const onChangeUpdateForm = (event) =>
    setUpdateForm({
      ...updateForm,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert("Mật khẩu xác nhận sai");
    }

    try {
        // goi api create account
        const res = await axios.put(apiUrl+`/taikhoan/${type}/capnhat`,updateForm)
        if (res.data.success) {
            toast.success("Cập nhật tài khoản thành công")
            getAccounts()
            setShowUpdateModal(false)
        } else {
            toast.error("Lỗi khi cập nhật tài khoản!!!")
        }
    } catch (error) {
      toast.error("Lỗi khi cập nhật tài khoản!")
      console.log(error);
    }
  };
  useEffect(()=> {
    setUpdateForm({
      username: accountInfo.taiKhoan,
      password: '',
      confirmPassword: "",
      soDienThoai: accountInfo.soDienThoai,
      hoTen: accountInfo.hoTen,
      diaChi: accountInfo.diaChi,
    });
  },[accountInfo])
  const resetData = () => {
    setAlert(null)
    setUpdateForm({
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
      <Modal
        show={showUpdateModal}
        onHide={() => {
          setShowUpdateModal(false);
          resetData()
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật tài khoản</Modal.Title>
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
                disabled
                value={username}
                onChange={onChangeUpdateForm}
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
                onChange={onChangeUpdateForm}
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
                onChange={onChangeUpdateForm}
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
                onChange={onChangeUpdateForm}
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
                onChange={onChangeUpdateForm}
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
                onChange={onChangeUpdateForm}
              />
            </Form.Group>
            <hr />
            <Button variant="success" type="submit">
              Cập nhật tài khoản
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateAccountModal;
