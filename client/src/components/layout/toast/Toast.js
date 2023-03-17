import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "./style.css"

function ToastMessage(props) {
  const { msg,show,closeToast } = props;

  return (
    <div>
      <ToastContainer className="ToastContainer">
        <Toast show={show} onClose={closeToast}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body>{msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default ToastMessage;
