import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

const NavbarMenu = () => {
    const {authState: {authLoading, isAuthenticated,user}}= useContext(AuthContext)
	let body= (
		<>
			<Nav.Link
				className='font-weight-bolder text-white'
				to='/dangnhap'
				as={Link}
			>
				Đăng nhập
			</Nav.Link>
			<Nav.Link
				className='font-weight-bolder text-white'
				to='/dangky'
				as={Link}
			>
				Đăng ký
			</Nav.Link>
		</>
	);
	if (isAuthenticated) {
		body= (
			<>
			<Nav.Link
				className='font-weight-bolder text-white'
				to='/user/giohang'
				as={Link}
			>
				Giỏ hàng
			</Nav.Link>
			<Nav.Link
				className='font-weight-bolder text-white'
				to='/user/taikhoan'
				as={Link}
			>
				Tài khoản
			</Nav.Link>
			</>
		)
	}
	return (
		<Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
			<Navbar.Brand className='font-weight-bolder text-white'>
				<Nav>
					<Nav.Link  
						to='/'
						as={Link}
					>
						<img
							src={learnItLogo}
							alt='learnItLogo'
							width='32'
							height='32'
							className='mr-2'
						/>
						Quản lý nông vụ
					</Nav.Link>
				</Nav>
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav >
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/vattu'
						as={Link}
					>
						Vật tư
					</Nav.Link>
				</Nav>
				<Nav className='ms-auto'>
					{body}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavbarMenu