import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import Table from 'react-bootstrap/esm/Table';
import { MuaVuContext } from '../../contexts/MuaVuContext';
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import addIcon from "../../assets/plus-circle-fill.svg"
import Tooltip from 'react-bootstrap/esm/Tooltip';
import AddMuaVuModal from '../../components/layout/AddMuaVuModal';

function MuaVu() {
    const {
        muaVuState:{
            muaVu,
            muaVuLoading
        },
        getMuaVu,
        deleteMuaVu,
        setShowAddMuaVuModal,
    } = useContext(MuaVuContext)

    useEffect(() => {getMuaVu()}, []);
    const chooseMuaVu = (_id) => {
        // findCategory(_id)
        // setShowUpdateCategoryModal(true)
    }
    let body=null;
    if (muaVuLoading) {
        body = (
            <div className="spinner-container">
              <Spinner animation="border" varient="info"></Spinner>
            </div>
          );
    } else {
        body = (
            <>
              <Table striped bordered hover style={{width:'1200px', margin: 'auto'}}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên mùa vụ</th>
                    <th>Năm</th>
                    <th>Tùy chọn</th>
                  </tr>
                </thead>
                <tbody>
                  {muaVu.map((vu,index) => (
                    <tr key={vu.msmv}>
                      <td>{index + 1}</td>
                      <td>{vu.tenMuaVu}</td>
                      <td>{vu.nam}</td>
                      <td>
                        <Button className="post-button" onClick={chooseMuaVu.bind(this, vu.msmv)}>
                        <img src={editIcon} alt="edit" width="24" height="24" />
                        </Button>{" "}
                        <Button style={{float:'right'}} onClick={deleteMuaVu.bind(this,vu.msmv)}>
                            <img src={deleteIcon} alt="delete" width="24" height="24" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  
                </tbody>
              </Table>
                    {/* open add post modal */}
                <OverlayTrigger placement='left' overlay={<Tooltip>Thêm danh mục mới</Tooltip>}>
                    <Button className="btn-floating" onClick={setShowAddMuaVuModal.bind(this,true)}>
                        <img src={addIcon} alt="add post" width='60' height='60' />
                    </Button>
                </OverlayTrigger>
            </>
        )
    }
  return (
    <div>
        {body}
        <AddMuaVuModal/>
    </div>
  )
}

export default MuaVu