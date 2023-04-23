import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import editIcon from "../../../assets/pencil.svg";
import deleteIcon from "../../../assets/trash.svg";
import axios from "axios";
import { apiUrl } from "../../../contexts/constants";
import { toast } from "react-toastify";
import UpdateAccountModal from "./UpdateAccountModal";

function TableAccount(props) {
  let { accounts, deleteAccount } = props;
  let [showUpdateModal, setShowUpdateModal] = useState(false);
  let [accountInfo, setAccountInfo] = useState(null)
  const getInfoAccount = (taiKhoan) => {
    axios.get(apiUrl+`/taikhoan/nhanvien/${taiKhoan}`)
      .then(res=>{
        if (res.data.success) {
          setAccountInfo(res.data.account)
          console.log("account: ", res.data.account)
        }
      })
  }
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên nhân viênn</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Tên tài khoản</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{account.hoTen}</td>
              <td>{account.soDienThoai}</td>
              <td>{account.diaChi}</td>
              <td>{account.taiKhoan}</td>
              <td>
                <Button
                  className="post-button"
                  onClick={() => {
                    getInfoAccount(account.taiKhoan)
                    setShowUpdateModal(true);
                  }}
                >
                  <img src={editIcon} alt="edit" width="24" height="24" />
                </Button>
                <Button
                  style={{ float: "right" }}
                  onClick={() => {
                    deleteAccount(account.taiKhoan);
                  }}
                >
                  <img src={deleteIcon} alt="delete" width="24" height="24" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      { accountInfo ?<UpdateAccountModal
        // showUpdateModal={showUpdateModal}
        // setShowUpdateModal={setShowUpdateModal}
        // accountInfo={accountInfo}
      ></UpdateAccountModal>:null}
      
    </div>
  );
}

export default TableAccount;
