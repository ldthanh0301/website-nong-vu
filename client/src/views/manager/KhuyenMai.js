import React, { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import Table from "react-bootstrap/esm/Table";
import { KhuyenMaiContext } from "../../contexts/KhuyenMaiContext";
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import Button from "react-bootstrap/esm/Button";
import AddKhuyenMaiModal from "../../components/admin/layout/khuyenMai/AddKhuyenMaiModal";
import UpdateKhuyenMai from "../../components/admin/layout/khuyenMai/UpdateKhuyenMai";
import { VND } from "../../utils/format";

function KhuyenMai() {
  let {
    khuyenMaiState:{khuyenMai,danhSachKhuyenMai,khuyenMaiLoading},
    getDSKhuyenMai,
    deleteKhuyenMai,
    getById,
    setShowAddKhuyenMaiModal,
    setShowUpdateKhuyenMaiModal
  } = useContext(KhuyenMaiContext);

  useEffect(()=>{
    getDSKhuyenMai()
  },[])
  
  const handlerUpdate =  (_id) => {
    getById(_id)
    setShowUpdateKhuyenMaiModal(true)
  }

  let body = null;

  if (khuyenMaiLoading) {
    body = (
        <div className="spinner-container">
          <Spinner animation="border" varient="info"></Spinner>
        </div>
      );
  } else {
    body = (
        <>
            <div>Tổng số lượng: {danhSachKhuyenMai.length}</div>
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên khuyến mãi</th>
                    <th>Giá trị khuyến mãi</th>
                    <th>Điều kiện khuyến mãi</th>
                    <th>Ngày bất đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Tùy chọn</th>
                  </tr>
                </thead>
                <tbody>
                  {danhSachKhuyenMai.map((khuyenMai,index) => (
                    <tr key={khuyenMai.mskm}>
                      <td>{index + 1}</td>
                      <td>{khuyenMai.tenKM}</td>
                      <td>{khuyenMai.giaTriKM}</td>
                      <td>{VND.format(khuyenMai.dieuKien)}</td>
                      <td>{khuyenMai.ngayBD}</td>
                      <td>{khuyenMai.ngayKT}</td>
                      <td>
                        <Button className="post-button" >
                        <img src={editIcon} alt="edit" width="24" height="24" onClick={handlerUpdate.bind(this,khuyenMai.mskm)}/>
                        </Button>{" "}
                        <Button style={{float:'right'}} onClick={deleteKhuyenMai.bind(this,khuyenMai.mskm)}>
                            <img src={deleteIcon} alt="delete" width="24" height="24" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  
                </tbody>
              </Table>
        </>
    )
  }
  return <>
    <h3>Khuyến Mãi</h3>
    <Button onClick={()=>{setShowAddKhuyenMaiModal(true)}}>Thêm mới</Button>
    <br/>
    <div>{body}</div>
    <AddKhuyenMaiModal></AddKhuyenMaiModal>
    {khuyenMai !== null &&<UpdateKhuyenMai khuyenMai={khuyenMai}/>}
  </>;
}

export default KhuyenMai;
