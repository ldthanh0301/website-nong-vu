import React, { useContext, useEffect } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import Table from 'react-bootstrap/esm/Table';
import { useParams } from 'react-router-dom'
import { DonHangContext } from '../../contexts/DonHangContext';
import { VND } from '../../utils/format';

function ChiTietDonHang() {
    const params = useParams()
    const msdh = params.id;

    const {orderState: {orderInfo, orderInfoLoading},chiTietDonHang} = useContext(DonHangContext)
    useEffect(()=> {chiTietDonHang(msdh)},[msdh])

    let body = null;
    if (orderInfoLoading) {
        body = (<div className="spinner-container">
            <Spinner animation="border" varient="info">
            </Spinner>
        </div>)
    } else if (orderInfo){
        body = (
            <>
                <h3>Thông tin đơn hàng:</h3>
                <div style={{padding:"15px", border:"1px solid", margin: "15px 0"}}>
                    Tên: <span>{orderInfo.info.hoTen}</span>
                    <hr />
                    Số điện thoại: <span>{orderInfo.info.soDienThoai}</span>
                    <hr />
                    Địa chỉ: <span>{orderInfo.info.diaChi}</span>
                    <hr />
                    Ngày đặt hàng: <span>{orderInfo.info.ngayDH}</span>
                    <hr />
                    Tổng tiền: <span>{VND.format(orderInfo.info.tongTien)}</span>
                    <hr />
                </div>
                <Table  striped bordered hover>
                <thead>
                    <tr>
                    <th>STT</th>
                    <th>Tên vật tư</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderInfo.products.map((vatTu, index) => (
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{vatTu.tenVatTu}</td>
                            <td>{vatTu.soLuong}</td>
                            <td>{VND.format(vatTu.gia)}</td>
                            <td>{VND.format(vatTu.tongGia)}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </Table>
            </>
            )
        }
    
    return (
        <>
          {body}
        </>
    )
}

export default ChiTietDonHang