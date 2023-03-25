import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/esm/Spinner";
import Table from "react-bootstrap/esm/Table";
import { useParams } from "react-router-dom";
import { DonHangContext } from "../../contexts/DonHangContext";

function OrderDetail() {
  const params = useParams();
  const msdh = params.id;

  const {
    orderState: { orderInfo, orderInfoLoading },
    chiTietDonHang,
  } = useContext(DonHangContext);
  useEffect(() => {
    chiTietDonHang(msdh);
  }, [msdh]);

  let body = null;
  if (orderInfoLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" varient="info"></Spinner>
      </div>
    );
  } else if (orderInfo) {
    body = (
      <>
        <h3>Thông tin đơn hàng:</h3>
        <Row >
          <Col lg="4">
            Họ và tên: <span>{orderInfo.info.hoTen}</span>
            <hr />
            Số điện thoại: <span>{orderInfo.info.soDienThoai}</span>
            <hr />
            Địa chỉ nhận hàng: <span>{orderInfo.info.diaChiGiaoHang}</span>
            <hr />
            Ngày đặt hàng: <span>{orderInfo.info.ngayDH}</span>
            <hr />
            Tổng tiền: <span>{orderInfo.info.tongTien}</span>
            <hr />
          </Col>
          <Col lg="8">
            <Table striped bordered hover>
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
                {orderInfo.products.map((vatTu, index) => (
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{vatTu.tenVatTu}</td>
                    <td>{vatTu.soLuong}</td>
                    <td>{vatTu.gia}</td>
                    <td>{vatTu.tongGia}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
          </Col>
        </Row>
      </>
    );
  }

  return <div style={{ width: "1200px", margin: "auto" }}>{body}</div>;
}

export default OrderDetail;
