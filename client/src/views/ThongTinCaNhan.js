import React, { useContext,  } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import SidebarMenuUser from '../components/layout/SidebarMenuUser'
import NavbarMenu from '../components/Navbar/NavbarMenu'
import { AuthContext } from '../contexts/AuthContext'

function ThongTinCaNhan() {
  const {authState:{user}} = useContext(AuthContext)


  let body = null;

  body = <div style={{display:'flex', padding:25}}>
      <div
        style={{padding: 25}}  
      >
        <h4>Họ và tên: {user.hoTen}</h4>
        <hr />
        <p
          style={{
            fontSize:18
          }}
        >Địa chỉ: {user.diaChi}</p>
        <hr />
        <p>Số điện thoai: {user.soDienThoai}</p>
      </div>
    </div>
  return (
    <>
      {body}
    </>
  )
}

export default ThongTinCaNhan