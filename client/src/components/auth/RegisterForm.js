import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
  // Context
	const { registerUser } = useContext(AuthContext)

	// Local state
	const [registerForm, setRegisterForm] = useState({
		username: '',
		password: '',
		confirmPassword: '',
		soDienThoai: '',
		hoTen:'',
		diaChi:''
	})

	const [alert, setAlert] = useState(null)

	const { username, password, confirmPassword,soDienThoai, hoTen, diaChi } = registerForm

	const onChangeRegisterForm = event =>
		setRegisterForm({
			...registerForm,
			[event.target.name]: event.target.value
		})

	const register = async event => {
		event.preventDefault()

		if (password !== confirmPassword) {
			setAlert({ type: 'danger', message: 'Passwords do not match' })
			setTimeout(() => setAlert(null), 5000)
			return
		}

		try {
			const registerData = await registerUser(registerForm)
			if (!registerData.success) {
				setAlert({ type: 'danger', message: registerData.message })
				setTimeout(() => setAlert(null), 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}

  return (
    <>
      <h1>Đăng ký</h1>
      <Form className='my-4' onSubmit={register}>
				<AlertMessage info={alert} />

				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Tài khoản'
						name='username'
						required
						value={username}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Mật khẩu'
						name='password'
						required
						value={password}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Xác nhận mật khẩu'
						name='confirmPassword'
						required
						value={confirmPassword}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Số điện thoai'
						name='soDienThoai'
						required
						value={soDienThoai}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Họ và tên'
						name='hoTen'
						required
						value={hoTen}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Địa chỉ'
						name='diaChi'
						required
						value={diaChi}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Button variant='success' type='submit'>
					Đăng ký
				</Button>
			</Form>
			<p>
				Bạn đã có tài khoản?
				<Link to='/dangnhap'>
					<Button variant='info' size='sm' className='ml-2'>
						Đăng nhập
					</Button>
				</Link>
			</p>
    </>
  );
};

export default RegisterForm;
