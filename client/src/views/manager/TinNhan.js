import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { apiUrl } from "../../contexts/constants";
import ChatAdmin from "../../components/chat/ChatAdmin";
import userImage from "../../assets/images/userImage.png"
function TinNhan() {
  const [userMessage, setUserMessage] = useState([]);
  const [nguoiNhan, setNguoiNhan] = useState(null);
  const getUserMessage = () => {
    axios
      .get(apiUrl + "/tinnhan/danhsachuser")
      .then((res) => setUserMessage(res.data.users));
  };
  useEffect(() => {
    getUserMessage();
  }, []);
  return (
    <div>
      <h3>Danh sách người gửi tin</h3>
      {userMessage.map((user) => (
        <ListGroup.Item style={{border: '1px solid', padding:'5px 15px', marginTop:'15px', borderRadius:'20px'}}>
          <Button style={{display: "flex",width: "300px"}} onClick={()=>{setNguoiNhan(user)}}>
            <img src={userImage} alt="" height={'32px'} width={'32px'} style={{borderRadius:"50%", border:"1px solid"}}/>
            <div className="mx-2">
              <span>{user.hoTen}</span>
              
            </div>
          </Button>
        </ListGroup.Item>
      ))}
        <ChatAdmin nguoiNhan={nguoiNhan}></ChatAdmin>
    </div>
  );
}

export default TinNhan;
