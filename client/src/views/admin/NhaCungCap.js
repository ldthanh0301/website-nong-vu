import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../contexts/constants";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import AddDistributorModal from "../../components/admin/distributor/AddDistributorModal";
import UpdateDistributorModal from "../../components/admin/distributor/UpdateDistributorModal";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

function NhaCungCap() {
  const [distributorList, setDistributorList] = useState([]);
  const [distributor, setDistributor] = useState(null);
  const [showAddDistributorModal, setShowAddDistributorModal] = useState(false);
  const [showUpdateDistributorModal, setShowUpdateDistributorModal] = useState(true);

  const getDistributorList = ()=> {
    axios.get(apiUrl + "/nhacungcap").then((res) => {
      setDistributorList(res.data.distributorList);
    });
  }
  useEffect(() => {
    getDistributorList()
  }, []);

  const handleUpdate = (msncc) => {
    axios.get(apiUrl + "/nhacungcap/" + msncc).then((res) => {
      setDistributor(res.data.distributor);
      setShowUpdateDistributorModal(true);
    });
  };
  const handleDelete = (msncc) => {
    axios.delete(apiUrl + "/nhacungcap/" + msncc).then((res) => {
      if (res.data.success) {
        getDistributorList()
        toast.success("Xóa thành công")
      } else {
        toast.error("Lỗi khi xóa")
      }
    }).catch((error)=> {
      toast.error("Lỗi khi xóa")
    })
  };
  let body = null;

  body = (<>
      <div>Tổng số lượng: {distributorList.length}</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên nhà cung cấp</th>
            <th>Mô tả</th>
            <th>Địa chỉ</th>
            <th>Số điện thoai</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {distributorList.map((distributor, index) => (
            <tr key={distributor.msncc}>
              <td>{index + 1}</td>
              <td>{distributor.tenNCC}</td>
              <td>{distributor.moTa}</td>
              <td>{distributor.diaChi}</td>
              <td>{distributor.soDienThoai}</td>
              <td>
                <Button
                  className="post-button"
                  onClick={() => handleUpdate(distributor.msncc)}
                >
                  <img src={editIcon} alt="edit" width="24" height="24" />
                </Button>
                <Button
                  style={{ float: "right" }}
                  onClick={() => handleDelete(distributor.msncc)}
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
  return (
    <div>
      <h3>Nhà cung cấp</h3>
      <Button onClick={() => setShowAddDistributorModal(true)}>Thêm mới</Button>
      {body}

      {showAddDistributorModal && (
        <AddDistributorModal
          getDistributorList={getDistributorList}
          closeModal={() => {
            setShowAddDistributorModal(false);
          }}
        />
      )}
      {showUpdateDistributorModal && distributor && (
        <UpdateDistributorModal
          distributor={distributor}
          closeModal={() => {
            setShowUpdateDistributorModal(false);
          }}
          getDistributorList={getDistributorList}
        />
      )}
    </div>
  );
}

export default NhaCungCap;
