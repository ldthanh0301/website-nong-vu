import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logoQLNV from "../../assets/logo/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Search from "../search/Search";
import "./style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

const NavbarMenu = () => {
  const {
    authState: { authLoading, isAuthenticated, user },
    logoutUser,
  } = useContext(AuthContext);
  let body = (
    <>
      <Nav.Link
        className="font-weight-bolder text-white"
        to="/dangnhap"
        as={Link}
      >
        Đăng nhập
      </Nav.Link>
      <Nav.Link
        className="font-weight-bolder text-white"
        to="/dangky"
        as={Link}
      >
        Đăng ký
      </Nav.Link>
    </>
  );
  if (isAuthenticated) {
    body = (
      <>
        <Nav.Link
          className="font-weight-bolder text-white mx-3 "
          to="/nguoidung/giohang"
          as={Link}
        >
         <FontAwesomeIcon icon="fa-solid fa-cart-shopping" size="xl" />
        </Nav.Link>
        <Dropdown className="dropdown-box">
          <Dropdown.Toggle type="button" className="btn btn-secondary dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >Tài khoản</Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu dropdown-menu-list">
            <Dropdown.Item>
              <Nav.Link
                to="/nguoidung/thongtin"
                as={Link}
                className="font-weight-bolder text-black"
              >
                Thông tin cá nhân
              </Nav.Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Nav.Link
                className="font-weight-bolder text-black"
                to="/nguoidung/donhang"
                as={Link}
              >
                Đơn hàng
              </Nav.Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Nav.Link
                className="font-weight-bolder text-black"
                to="/nguoidung/chiphi"
                as={Link}
              >
                Chi phí
              </Nav.Link>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                logoutUser();
                window.location.reload();
              }}
            > 
              <Button variant="danger">
                <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />Đăng xuất
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  }
  return (
    <Navbar
      expand="lg"
      bg="primary"
      variant="dark"
      className="navbar shadow"
    >
      <Navbar.Brand className="font-weight-bolder text-white">
        <Nav>
          <Nav.Link to="/" as={Link}>
            <img
              src={logoQLNV}
              alt="Quản lý nông vụ"
              width="64"
              height="64"
              className="mx-5"
            />
          </Nav.Link>
        </Nav>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/vattu"
            as={Link}
          >
            Vật tư
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/khuyenmai"
            as={Link}
          >
            Khuyến mãi
          </Nav.Link>
        </Nav>
        <Search></Search>
        <Nav className="ms-auto align-items-center">{body}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
