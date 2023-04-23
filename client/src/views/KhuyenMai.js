import React, { useContext, useEffect } from 'react'
import Row from 'react-bootstrap/esm/Row';
import Spinner from 'react-bootstrap/esm/Spinner';
import { NavLink } from 'react-router-dom';
import { KhuyenMaiContext } from '../contexts/KhuyenMaiContext';

function KhuyenMai() {
  const {khuyenMaiState: {danhSachKhuyenMai, khuyenMaiLoading}, getDSKhuyenMai} = useContext(KhuyenMaiContext)

  useEffect(()=>{
    getDSKhuyenMai()
  },[])


  let body =null;

  if (khuyenMaiLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" varient="info">
          
        </Spinner>
      </div>
    );
  } else {
    body = (
      <Row>
        {danhSachKhuyenMai.map(km=>(
        <div key={km.mskm} className="col-lg-3 col-md-4 col-6">
          <div  className="card" >
            <div className="card-body">
              <h5 className="card-title">{km.tenKM}</h5>
              <span className="card-subtitle mb-2 text-muted">{km.giaTriKM+"%"}</span>
              <p className="card-text">Ngày bất đầu: {km.ngayBD}</p>
              <p className="card-text">Ngày kết thúc: {km.ngayKT}</p>
              <NavLink to={`./${km.mskm}`}>Xem Chi Tiết</NavLink>
            </div>
          </div>
        </div>
      ))}  
      </Row>
      
    )
  }

  return (
    <>
      <h3>Khuyến mãi</h3>
      {body}
    </>
  )
}

export default KhuyenMai