import React, { useContext, useEffect } from "react";
import { Button, Table } from "react-bootstrap";


function NhaCungCap() {
  let body= null;

  body = (
    <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên nhà cung cấp</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoai</th>
                    <th>Tùy chọn</th>
                  </tr>
                </thead>
                <tbody>
                    <tr >
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                </tbody>
              </Table>
  )
  return <div>
    <h3>Nhà cung cấp</h3>
    <Button onClick={()=>{}}>Thêm mới</Button>
    {body}
  </div>;
}

export default NhaCungCap;
