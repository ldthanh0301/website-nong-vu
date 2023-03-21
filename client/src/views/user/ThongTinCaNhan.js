import React, { useContext,  } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import SidebarMenuUser from '../../components/Sidebar/SidebarMenuUser'
import NavbarMenu from '../../components/Navbar/NavbarMenu'
import { AuthContext } from '../../contexts/AuthContext'
import { Button } from 'react-bootstrap'
import UpdateProfileModal from '../../components/user/profile/UpdateProfileModal'

function ThongTinCaNhan() {
  const {authState:{user}} = useContext(AuthContext)


  let body = null;

  body = <div style={{ padding:25}}>
      <div>
        <h4>Họ và tên: {user.hoTen}</h4>
        <hr />
        <p
          style={{
            fontSize:18
          }}
        >Địa chỉ: {user.diaChi}</p>
        <hr />
        <p>Số điện thoai: {user.soDienThoai}</p>
        <UpdateProfileModal></UpdateProfileModal>
      </div>
    </div>
  return (
    <>
    <h2>Thông tin cá nhân</h2>
      {body}
    </>
  )
}

export default ThongTinCaNhan