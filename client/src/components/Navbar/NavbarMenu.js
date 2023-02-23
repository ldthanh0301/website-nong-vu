import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

const NavbarMenu = () => {
    const {authState: {authLoading, isAuthenticated,user}, logoutUser}= useContext(AuthContext)
	let navbar = null;
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
		navbar = (
		<>
			<Nav.Link
				className="font-weight-bolder text-white"
				to="/nguoidung/donhang"
				as={Link}
			>
				Đơn hàng
			</Nav.Link>
			<Nav.Link
				className="font-weight-bolder text-white"
				to="/nguoidung/chiphi"
				as={Link}
			>
				Chi phí
			</Nav.Link>
			<Nav.Link
				className="font-weight-bolder text-white"
				to="/khuyenmai"
				as={Link}
			>
				Khuyến mãi
			</Nav.Link>
		</>
		);
		body= (
			<>
			<Nav.Link
				className='font-weight-bolder text-white'
				to='/nguoidung/giohang'
				as={Link}
			>
				Giỏ hàng
			</Nav.Link>
			<Dropdown>
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					Tài khoản
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item href="/nguoidung/thongtin">Thông tin cá nhân</Dropdown.Item>
					<Dropdown.Item onClick={()=>{
						logoutUser()
						window.location.reload()
					}}>Đăng xuất</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			</>
		)
	}
	return (
		<Navbar expand='lg' bg='primary' variant='dark' className='shadow' style={{padding: "5px 50px"}}>
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
					{navbar}
				</Nav>
				<Nav className='ms-auto'>
					{body}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavbarMenu