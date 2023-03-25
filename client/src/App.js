import "./App.css";
import "./assets/css/responsive.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./views/Auth";
import Dashboard from "./views/admin/Dashboard";
import ProtectedRouteUser from "./components/routing/ProtectedRouteUser";
import Product from "./views/admin/Product";
import Category from "./views/admin/Category";
import ChiTietVatTu from "./views/ChiTietVatTu";
import Home from "./views/Home";
import ProtectedRouteAdmin from "./components/routing/ProtectedRouteAdmin";
import Cart from "./views/Cart";
import MuaVu from "./views/admin/MuaVu";
import VatTu from "./views/VatTu";
import DonHang from "./views/admin/DonHang";
import DoanhThu from "./views/admin/DoanhThu";
import ThongTinCaNhan from "./views/user/ThongTinCaNhan";
import ChiTietDonHang from "./views/admin/ChiTietDonHang";
import Order from "./views/user/Order";
import OrderDetail from "./views/user/OrderDetail";
import Expense from "./views/user/Expense";
import KhuyenMai from "./views/KhuyenMai";
import KhuyenMaiAdmin from "./views/admin/KhuyenMai";
import PublicRoute from "./components/routing/PublicRoute";
import NhaCungCap from "./views/admin/NhaCungCap";
import { ContextProvider } from "./contexts";
import "./fontawesome"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ContextProvider>
      <Routes>
        {/* Guest */}
        <Route path="dangnhap" element={<Auth authRoute="login" />} />
        <Route path="dangky" element={<Auth authRoute="register" />} />
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="vattu" element={<VatTu />}></Route>
          <Route path="vattu/:id" element={<ChiTietVatTu />}></Route>
          <Route path="khuyenmai" element={<KhuyenMai />}></Route>
        </Route>
        {/* User */}
        <Route path="nguoidung" element={<ProtectedRouteUser />}>
          <Route path="" element={<ThongTinCaNhan />}></Route>
          <Route path="thongtin" element={<ThongTinCaNhan />}></Route>
          <Route path="giohang" element={<Cart />}></Route>
          <Route path="chiphi" element={<Expense />}></Route>
          <Route path="donhang" element={<Order />}></Route>
          <Route
            path="donhang/:id"
            element={<OrderDetail />}
          ></Route>
        </Route>
        {/* admin */}
        <Route path="admin" element={<ProtectedRouteAdmin />}>
          <Route path="" element={<Dashboard />}></Route>
          <Route path="donhang" element={<DonHang />}></Route>
          <Route
            path="donhang/chitietdonhang/:id"
            element={<ChiTietDonHang />}
          ></Route>
          <Route path="doanhthu" element={<DoanhThu />}></Route>
          <Route path="vattu" element={<Product />}></Route>
          <Route path="danhmuc" element={<Category />}></Route>
          <Route path="muavu" element={<MuaVu />}></Route>
          <Route path="khuyenmai" element={<KhuyenMaiAdmin />}></Route>
          <Route path="nhacungcap" element={<NhaCungCap />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </ContextProvider>
  );
}

export default App;
