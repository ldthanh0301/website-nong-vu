import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { ProductContext } from "../../../contexts/ProductContext";
import { useContext } from "react";
import "./style.css";

let listProducts;

const DynamicUserBreadcrumb = ({ match }) => {
  let nameProduct = "";
  const id = match.params.id;
  listProducts.map((product) => {
    if (product.msvt == id) {
      nameProduct = product.tenVatTu;
      return;
    }
    return;
  });
  return <span>{nameProduct}</span>;
};

// define custom breadcrumbs for certain routes.
// breadcrumbs can be components or strings.
const routesUser = [
  { path: "/", breadcrumb: "Trang chủ" },
  { path: "/nguoidung", breadcrumb: "Người dùng" },
  { path: "/nguoidung/donhang", breadcrumb: "Đơn hàng" },
  { path: "/nguoidung/chiphi", breadcrumb: "Chi phí" },
  { path: "/nguoidung/thongtin", breadcrumb: "Thông tin cá nhân" },
  { path: "/nguoidung/giohang", breadcrumb: "Giỏ hàng" },
  { path: "/vattu", breadcrumb: "Vật tư" },
  { path: "/vattu/:id", breadcrumb: DynamicUserBreadcrumb },
  {
    path: "/khuyenmai",
    breadcrumb: "Khuyến mãi",
  },
];
const routesAdmin = [
  { path: "/", breadcrumb: "Trang chủ" },
  { path: "/admin", breadcrumb: "Trang chủ" },
  { path: "/admin/donhang", breadcrumb: "Đơn hàng" },
  { path: "/admin/vattu", breadcrumb: "Vật tư" },
  { path: "/admin/muavu", breadcrumb: "Mùa vụ" },
  { path: "/admin/khuyenmai", breadcrumb: "Khuyến mãi" },
  { path: "/admin/nhacungcap", breadcrumb: "Nhà cung cấp" },
  { path: "/admin/danhmuc", breadcrumb: "Danh mmucj" },
];
// map & render your breadcrumb components however you want.
const Breadcrumbs = (props) => {
  const {type} = props;
  const {
    productState: { products },
  } = useContext(ProductContext);
  listProducts = products;
  let routes = null;
  if (type ==="admin") {
    routes = routesAdmin;
  } else {
    routes = routesUser;
  }
  let breadcrumbs=useBreadcrumbs(routes); ;

  return (
    <>
      <Breadcrumb>
        {breadcrumbs.map(({ match, breadcrumb }) => (
          <Breadcrumb.Item key={match.pathname}>
            <NavLink to={match.pathname}>{breadcrumb}</NavLink>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </>
  );
};

export default Breadcrumbs;
