import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./style.css"

function Chat({ userType }) {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    newSocket.emit("join",  userType);

    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });
    }
  }, [socket]);

  const handleSend = () => {
    if (message) {
      socket.emit("message", { userType, message });
      setMessages((messages) => [...messages, { userType, message }]);
      setMessage("");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend()
    }
  }
  return (
    <div className="chatbox">
      <div className="chaxbox-header">
        <span>{"Tài khoản "+userType}</span>
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
  );
}

export default Chat;
