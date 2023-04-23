import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import AddAccountModal from '../../components/admin/account/AddAccountModal';
import TableAccount from '../../components/admin/account/TableAccount';
import axios from 'axios';
import { apiUrl } from '../../contexts/constants';
import { toast } from 'react-toastify';

function TaiKhoan() {
  let body = null;
  const [accounts, setAccounts]= useState([])
  let deleteAccount = (taiKhoan) => [
    axios.delete(apiUrl+`/taikhoan/nhanvien/${taiKhoan}`)
      .then(res=>{
        if (res.data.success) {
          toast.success("Xóa thành công")
          getAccounts()
        } else {
          toast.error("Lỗi khi xóa tài khoản")
        }
      })
  ]
  let getAccounts = ()=>[
    axios.get(apiUrl+"/taikhoan/nhanvien").then(res=>{
      if (res.data.success) {
        setAccounts(res.data.accounts)
      }
    })
  ]
  useEffect(()=>{
    getAccounts()
  },[])
  body = (
    <TableAccount accounts={accounts} deleteAccount={deleteAccount}></TableAccount>
  );
  return (
    <div>
      <h3>Tài khoản</h3>
      <AddAccountModal getAccounts={getAccounts}></AddAccountModal>
      {body}
    </div>
  )
}

export default TaiKhoan