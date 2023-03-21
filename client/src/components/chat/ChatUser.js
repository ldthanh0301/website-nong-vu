import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { chatServerURL } from "../../contexts/constants";
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthContext } from "../../contexts/AuthContext";

function ChatUser() {
  const userType = "User";
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const {authState:{user,isAuthenticated, authLoading }} = useContext(AuthContext)

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      const newSocket = io(chatServerURL);
      newSocket.emit("join",  {userType, username: user.taiKhoan});
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });
    }
  }, [socket]);

  const handleSend = () => {
    if (message) {
      let TinNhan = {nguoiGui: user.taiKhoan, nguoiNhan:'admin',tinNhan:message};
      socket.emit("message", { userType,  TinNhan});
      setMessages((messages) => [...messages, { userType, message }]);
      setMessage("");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend()
    }
  }
  const [showBoxChat, setShowBoxChat]= useState(false)
  const [showButtonChat, setButtonChat]= useState(true)

  const handleChatBox = () => {
    setShowBoxChat(!showBoxChat)
    setButtonChat(!showButtonChat)
  }
  return (
    <div>
        <button className={`btn-chat ${showButtonChat ? "visible": "hidden"}`} onClick={handleChatBox}>
          <FontAwesomeIcon className="icon" icon={['fas', 'fa-message']} />
        </button> 
        <div className={`chatbox ${showBoxChat ? "visible":"hidden"}`}>
          <div className="chaxbox-header">
            <span>{"Tài khoản "+userType}</span>
            <button className="btn " onClick={handleChatBox}>
              <FontAwesomeIcon className="icon" icon={['fas', 'fa-x']} />
            </button>
          </div>
          <ul className="box-messages">
            {messages.map((message, index) => (
              <li key={index} className={`message-line ${userType===message.userType ? "myself" : ""}`}>
                <span className="message">{message.message}</span>
              </li>
            ))}
          </ul>
          <div className="input-box">
            <input
              type="text"
              placeholder="Nhập tin nhấn ...."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend} >Send</button>
          </div>
        </div>
    </div>
  );
}

export default ChatUser;
