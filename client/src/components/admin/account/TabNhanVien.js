import React, { useEffect, useState } from "react";
import AddAccountModal from "./AddAccountModal";
import TableAccount from "./TableAccount";
import axios from "axios";
import { apiUrl } from "../../../contexts/constants";
import { toast } from "react-toastify";

function TabNhanVien() {
  const [accounts, setAccounts] = useState([]);
  let deleteAccount = (taiKhoan) => {
    axios.delete(apiUrl + `/taikhoan/nhanvien/${taiKhoan}`).then((res) => {
      if (res.data.success) {
        toast.success("Xóa thành công");
        getAccounts();
      } else {
        toast.error("Lỗi khi xóa tài khoản");
      }
    })}
  let getAccounts = () => {
    axios.get(apiUrl + "/taikhoan/nhanvien").then((res) => {
      if (res.data.success) {
        setAccounts(res.data.accounts);
      }
    })
  };
  useEffect(() => {
    getAccounts();
  }, []);
  return (
    <>
      <AddAccountModal getAccounts={getAccounts} type="nhanvien"></AddAccountModal>
      <hr />
      <TableAccount
        accounts={accounts}
        deleteAccount={deleteAccount}
        getAccounts={getAccounts}
      ></TableAccount>
    </>
  );
}

export default TabNhanVien;
