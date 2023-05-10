import React, { useEffect, useState } from "react";
import AddAccountModal from "./AddAccountModal";
import TableAccount from "./TableAccount";
import axios from "axios";
import { apiUrl } from "../../../contexts/constants";
import { toast } from "react-toastify";

function TabNongDan() {
  const [accounts, setAccounts] = useState([]);
  let deleteAccount = (taiKhoan) => {
    try {
      axios.delete(apiUrl + `/taikhoan/nongdan/${taiKhoan}`).then((res) => {
        if (res.data.success) {
          toast.success("Xóa thành công");
          getAccounts();
        } else {
          toast.error("Lỗi khi xóa tài khoản");
        }
      }).catch(()=>{
        console.log("Lỗi server")      
      toast.error("Lỗi khi xóa tài khoản")
      })
    } catch (error) {
      console.log("Lỗi server")      
      toast.error("Lỗi khi xóa tài khoản")
    }
  };
  let getAccounts = () => {
    axios.get(apiUrl + "/taikhoan/nongdan" ).then((res) => {
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
      <AddAccountModal getAccounts={getAccounts} type='nongdan'></AddAccountModal>
      <hr />
      <TableAccount
        accounts={accounts}
        deleteAccount={deleteAccount}
        getAccounts={getAccounts}
        type="nongdan"
      ></TableAccount>
    </>
  );
}

export default TabNongDan;
