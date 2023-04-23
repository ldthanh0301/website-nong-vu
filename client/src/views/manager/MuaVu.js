import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import Table from "react-bootstrap/esm/Table";
import { MuaVuContext } from "../../contexts/MuaVuContext";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import addIcon from "../../assets/plus-circle-fill.svg";
import Tooltip from "react-bootstrap/esm/Tooltip";
import AddMuaVuModal from "../../components/layout/AddMuaVuModal";

function MuaVu() {
  const {
    muaVuState: { muaVu, muaVuLoading },
    getMuaVu,
    deleteMuaVu,
    setShowAddMuaVuModal,
  } = useContext(MuaVuContext);

  useEffect(() => {
    getMuaVu();
  }, []);
  const chooseMuaVu = (_id) => {
    // findCategory(_id)
    // setShowUpdateCategoryModal(true)
  };
  let body = null;
  if (muaVuLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" varient="info"></Spinner>
      </div>
    );
  } else {
    body = (
      <>
        <h3>Mùa vụ</h3>
        <div>Tổng số lượng: {muaVu.length}</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên mùa vụ</th>
              <th>Năm</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {muaVu.map((vu, index) => (
              <tr key={vu.msmv}>
                <td>{index + 1}</td>
                <td>{vu.tenMuaVu}</td>
                <td>{vu.nam}</td>
                <td>
                  <Button
                    className="post-button"
                    onClick={chooseMuaVu.bind(this, vu.msmv)}
                  >
                    <img src={editIcon} alt="edit" width="24" height="24" />
                  </Button>{" "}
                  <Button
                    style={{ float: "right" }}
                    onClick={deleteMuaVu.bind(this, vu.msmv)}
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
  return (
    <div>
      <Button
        className="btn"
        onClick={setShowAddMuaVuModal.bind(this, true)}
      >
        Thêm mới
      </Button>
      <hr />
      {body}
      <AddMuaVuModal />
    </div>
  );
}

export default MuaVu;
