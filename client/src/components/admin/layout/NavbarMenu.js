import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../../assets/logo.svg'
import logoutIcon from '../../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { useContext } from 'react'

const NavbarMenu = () => {
	const {
		authState: {
			user: { username }
		},
		logoutUser
	} = useContext(AuthContext)

	const logout = () => logoutUser()

	return (
		<Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
			<Navbar.Brand className='font-weight-bolder text-white'>
				<img
					src={learnItLogo}
					alt='learnItLogo'
					width='32'
					height='32'
					className='mr-2'
				/>
				Quản lý nông vụ
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav >
					<Nav.Link
						className='font-weight-bolder text-white'
						to='donhang'
						as={Link}
					>
						Đơn hàng
					</Nav.Link>
					
					<Nav.Link
						className='font-weight-bolder text-white'
						to='vattu'
						as={Link}
					>
						Vật tư
					</Nav.Link>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='categories'
						as={Link}
					>
						Danh mục
					</Nav.Link>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='muavu'
						as={Link}
					>
						Mùa vụ
					</Nav.Link>
				</Nav>
				<Nav className='ms-auto'>
					<Nav.Link className='font-weight-bolder text-white ' disabled>
						Welcome {username}
					</Nav.Link>
					<Button
						variant='secondary'
						className='font-weight-bolder text-white'
						onClick={logout}
					>
						<img
							src={logoutIcon}
							alt='logoutIcon'
							width='32'
							height='32'
							className='mr-2'
						/>
						Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavbarMenu