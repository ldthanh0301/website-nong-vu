import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useState, useContext } from "react";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  //context
  const {loginUser} = useContext(AuthContext)
  
  //router
  const navigate = useNavigate()
  //local state
  const [loginForm, setLoginForm] = useState({
    username:'',
    password:''
  })
  const [alert, setAlert] = useState(null)
  const {username, password} = loginForm

  const onChangeLoginForm = event => 
    setLoginForm({...loginForm,[event.target.name]: event.target.value})
  
  const login = async event =>{
    event.preventDefault()

    try {
      const loginData = await loginUser(loginForm)
      if (loginData.success) {
        if (loginData.account.quyen===0) {
          navigate("/")
        } else if (loginData.account.quyen ===1){
          navigate('/manager/');
        } else if (loginData.account.quyen ===2) {
          navigate('/admin/');
        }
      }else {
        setAlert({type:'danger', message: loginData.message})
        setTimeout(()=> setAlert(null),5000)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
      <h1> Đăng nhập </h1>{" "}
      <Form onSubmit={login}>
      <AlertMessage info={alert}/>
        <Form.Group className="mb-3" controlId="formBasicAccount">
          <Form.Control 
            type="text" 
            placeholder="Nhập tài khoản" 
            required 
            name='username' 
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control 
            type="password" 
            placeholder="Nhập mật khẩu" 
            required 
            name="password"
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Đăng nhập
        </Button>
      </Form>
      <p style={{margin: '1rem 0'}}>
        Bạn chưa có tài khoản ?
        <Link to="/dangky">
          <Button variant="info" size="sm" className="ml-2">
            Đăng ký
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
