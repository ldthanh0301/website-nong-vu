import "./App.css";
import "./assets/css/responsive.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./views/Auth";
import ProtectedRouteUser from "./components/routing/ProtectedRouteUser";
import ChiTietVatTu from "./views/ChiTietVatTu";
import Home from "./views/Home";
import ProtectedRouteAdmin from "./components/routing/ProtectedRouteAdmin";
import Cart from "./views/Cart";
import VatTu from "./views/VatTu";
import ThongTinCaNhan from "./views/user/ThongTinCaNhan";
import Order from "./views/user/Order";
import OrderDetail from "./views/user/OrderDetail";
import Expense from "./views/user/Expense";
import KhuyenMai from "./views/KhuyenMai";
import KhuyenMaiManager from "./views/manager/KhuyenMai";
import PublicRoute from "./components/routing/PublicRoute";
import { ContextProvider } from "./contexts";
import "./fontawesome"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRouteManager from "./components/routing/ProtectedRouteManager";
import Dashboard from "./views/manager/Dashboard";
import DonHang from "./views/manager/DonHang";
import ChiTietDonHang from "./views/manager/ChiTietDonHang";
import DoanhThu from "./views/admin/DoanhThu";
import Product from "./views/manager/Product";
import Category from "./views/manager/Category";
import MuaVu from "./views/manager/MuaVu";
import NhaCungCap from "./views/manager/NhaCungCap";
import TaiKhoan from "./views/admin/TaiKhoan";
import TinNhan from "./views/manager/TinNhan";

function App() {
  return (
    <ContextProvider>
      <Routes>
        {/* Guest */}
        <Route path="dangnhap" element={<Auth authRoute="login" />} />
        <Route path="dangky" element={<Auth authRoute="register" />} />
        <Route path="/" element={<PublicRoute />}>
          <Route path="" element={<Home />} />
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
          <Route path="doanhthu" element={<DoanhThu />}></Route>
          <Route path="taikhoan" element={<TaiKhoan />}></Route>
        </Route>
        
        {/* manager */}
        <Route path="manager" element={<ProtectedRouteManager />}>
          <Route path="" element={<Dashboard />}></Route>
          <Route path="donhang" element={<DonHang />}></Route>
          <Route
            path="donhang/chitietdonhang/:id"
            element={<ChiTietDonHang />}
          ></Route>
          <Route path="vattu" element={<Product />}></Route>
          <Route path="danhmuc" element={<Category />}></Route>
          <Route path="muavu" element={<MuaVu />}></Route>
          <Route path="khuyenmai" element={<KhuyenMaiManager />}></Route>
          <Route path="nhacungcap" element={<NhaCungCap />}></Route>
          <Route path="tinnhan" element={<TinNhan />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </ContextProvider>
  );
}

export default App;
