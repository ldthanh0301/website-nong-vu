import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { apiUrl } from "../../contexts/constants";
import ChatAdmin from "../../components/chat/ChatAdmin";

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
          <Button onClick={()=>{setNguoiNhan(user)}}>
            {user.hoTen}
          </Button>
        </ListGroup.Item>
      ))}
        <ChatAdmin nguoiNhan={nguoiNhan}></ChatAdmin>
    </div>
  );
}

export default TinNhan;
