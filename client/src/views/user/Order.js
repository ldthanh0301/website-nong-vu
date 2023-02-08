import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { DonHangContext } from '../../contexts/DonHangContext'

function Order() {
  const {orderState:{orders},getOrderByUser}  = useContext(DonHangContext)
  useEffect(()=>{
    getOrderByUser()
  },[])

  let body = null

  body = (
    <>
      <div className='row'>

        {orders.map(order=>(
          <div key={order.msdh} className='col-4'>
            <div  className="card" style={{width: '25rem'}}>
              <div className="card-body">
                <h5 className="card-title">Đơn hàng</h5>
                <h6 className="card-subtitle mb-2 text-muted">Ngày đặt hàng:{order.ngayDH}</h6>
                <p className="card-text">Tổng tiền: {order.tongTien}</p>
                <NavLink to={`./chitietdonhang/${order.msdh}`}>Xem Chi Tiết</NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
  
  return (
    <div className="container">
      {body}
    </div>
  )
}

export default Order