import React, { useContext, useEffect } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import Table from 'react-bootstrap/esm/Table';
import { useParams } from 'react-router-dom'
import { DonHangContext } from '../../contexts/DonHangContext';
import { VND } from '../../utils/format';
import { Form } from 'react-bootstrap';

function ChiTietDonHang() {
    const params = useParams()
    const msdh = params.id;

    const {orderState: {orderInfo, orderInfoLoading},chiTietDonHang,changeState} = useContext(DonHangContext)
    useEffect(()=> {chiTietDonHang(msdh)},[msdh])

    const handleChange = (msdh,e) => {
        console.log("msdh : ", msdh)
          let state = e.target.value;
          changeState(state, msdh)
        }
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
                    Địa chỉ: <span>{orderInfo.info.diaChiGiaoHang}</span>
                    <hr />
                    Ngày đặt hàng: <span>{orderInfo.info.ngayDH}</span>
                    <hr />
                    Tổng tiền: <span>{VND.format(orderInfo.info.tongTien)}</span>
                    <hr />
                    Trạng thái:
                    <Form.Select aria-label="Default select example"
                        onChange={(e) => handleChange(orderInfo.info.msdh,e)}
                    >
                      <option value="0" selected={0==orderInfo.info.trangThai}>Chưa duyệt</option>
                      <option value="1" selected={1==orderInfo.info.trangThai}>Đã duyệt</option>
                      <option value="2" selected={2==orderInfo.info.trangThai}>Đã giao</option>
                    </Form.Select>
                </div>
                <hr />
                <h5>Danh sách sản phẩm:</h5>
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