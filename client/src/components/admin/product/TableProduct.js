import React from "react";
import { Button, Table } from "react-bootstrap";
import editIcon from "../../../assets/pencil.svg";
import deleteIcon from "../../../assets/trash.svg";
import { VND } from "../../../utils/format";
import { apiUrl } from "../../../contexts/constants";

function TableProduct(props) {
  const { products, findProduct, setShowUpdateProductModal,deleteProduct } = props;
  const handlerUpdate = (_id) => {
    findProduct(_id);
    setShowUpdateProductModal(true);
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên vật tư</th>
            <th>Ảnh</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Số lượng</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {products.map((vatTu, index) => (
            <tr key={vatTu.msvt}>
              <td>{index + 1}</td>
              <td>{vatTu.tenVatTu}</td>
              <td>
                <img
                  src={apiUrl + "/" + vatTu.diaChiHinh}
                  width="126px"
                  alt=""
                  srcset=""
                />
              </td>
              <td>{VND.format(vatTu.gia)}</td>
              <td>{vatTu.moTa}</td>
              <td>{vatTu.soLuong}</td>
              <td>
                <Button
                  className="post-button"
                  onClick={handlerUpdate.bind(this, vatTu.msvt)}
                >
                  <img src={editIcon} alt="edit" width="24" height="24" />
                </Button>{" "}
                <Button
                  style={{ float: "right" }}
                  onClick={deleteProduct.bind(this, vatTu.msvt)}
                >
                  <img src={deleteIcon} alt="delete" width="24" height="24" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TableProduct;
