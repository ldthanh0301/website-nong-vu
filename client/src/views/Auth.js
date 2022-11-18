import React from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Navigate} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const Auth = ({ authRoute }) => {
  const {authState: {authLoading, isAuthenticated, user}} = useContext(AuthContext)

  let body;

  if (authLoading) 
    body=(
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation='border' varient='info'/>
      </div>
    )
  else if (!isAuthenticated){
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    )
  } else if (user.quanLy===0)
    return <Navigate to='/'/>
  else  {
    return <Navigate to='/admin/'/>
  }
   
  return <div className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        {body}
      </div>
    </div>
  </div>;
};

export default Auth;
