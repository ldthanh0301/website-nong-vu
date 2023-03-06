import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartReducer } from "../reducers/cartReducer";
import { AuthContext } from "./AuthContext";
import {
  Add_PRODUCT_TO_CART,
  apiUrl,
  DELETE_PRODUCT_IN_CART,
  GET_CART,
  RESET_CART,
  Tang_So_Luong,
  TINH_GIA_KM,
} from "./constants";
import { KhuyenMaiContext } from "./KhuyenMaiContext";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  const [cartState, dispatch] = useReducer(cartReducer, {
    cart: {
      products: [],
      tongTien: 0,
    },
  });

  // khuyen mai
  const [khuyenMaiInCart, setKhuyenMaiInCart] = useState(null);
  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        tongTien: 0,
      };
    } else {
      // kiểm tra giảm giá
      if (khuyenMaiInCart) {
        cart.tongTien =
          cart.tongTien - (cart.tongTien * khuyenMaiInCart.giaTriKM) / 100;
      }
    }

    dispatch({ type: GET_CART, payload: cart });
  };
  useEffect(() => {
    getCart();
  }, []);
  // làm mới giỏ hàng
  const resetCart = async () => {
    localStorage.removeItem("cart")
    dispatch({ type: RESET_CART, payload: { products: [], tongTien: 0 } });
  };
  // đặt hàng
  const datHang = async () => {
    let data = { ...cartState.cart, msnd: user.msnd,mskm:null};
    if (khuyenMaiInCart) {
        data = {...data, mskm:khuyenMaiInCart.mskm}
    }
    try {
      let res = await axios.post(`${apiUrl}/donhang`, data);
      if (res.data.success) {
        setShowToast({
          show: true,
          message: "Đặt hàng thành công",
          type: null,
        });
        resetCart();
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  const addProductToCart = (vatTu) => {
    vatTu.soLuong = 1;
    vatTu.tongGia = vatTu.gia * vatTu.soLuong;

    let products = cartState.cart.products;
    let trung = products.findIndex((e) => e.msvt === vatTu.msvt);
    if (trung !== -1) {
      let newVatTu = products[trung];
      newVatTu.soLuong += 1;
      newVatTu.tongGia += vatTu.tongGia;
      products.splice(trung, 1, newVatTu);
    } else {
      products = [...cartState.cart.products, vatTu];
    }
    //  tính tổng tiền của giỏ hàng
    let tongTien = products.reduce((tongTien, e) => e.tongGia + tongTien, 0);

    let cart = { products, tongTien };

    localStorage.setItem("cart", JSON.stringify(cart));
    setShowToast({
      show: true,
      message: "Đã thêm sản phẩm vào giỏ hàng",
      type: "success",
    });

    // kiểm tra giảm giá
    if (khuyenMaiInCart) {
        tongTien = tongTien - (tongTien * khuyenMaiInCart.giaTriKM) / 100;
        cart = { products, tongTien };
      }
    dispatch({ type: Add_PRODUCT_TO_CART, payload: cart });
  };
  const deleteProductInCart = async (vatTu) => {
    let products = cartState.cart.products.filter((e) => e.msvt !== vatTu.msvt);
    let tongTien = products.reduce((tongTien, e) => e.tongGia + tongTien, 0);

    let cart = { products, tongTien };
    localStorage.setItem("cart", JSON.stringify(cart));
    // kiểm tra giảm giá
    if (khuyenMaiInCart) {
      tongTien = tongTien - (tongTien * khuyenMaiInCart.giaTriKM) / 100;
      cart = { products, tongTien };
    }
    dispatch({ type: DELETE_PRODUCT_IN_CART, payload: cart });
  };
  const tangSoLuong = (soLuong, viTri) => {
    cartState.cart.products[viTri].soLuong = soLuong;
    cartState.cart.products[viTri].tongGia =
      soLuong * cartState.cart.products[viTri].gia;
    let products = cartState.cart.products;

    let tongTien = cartState.cart.products.reduce(
      (tongTien, product) => tongTien + product.tongGia,
      0
    );
    // kiểm tra giảm giá
    if (khuyenMaiInCart) {
      tongTien = tongTien - (tongTien * khuyenMaiInCart.giaTriKM) / 100;
    }
    let cart = { products, tongTien };
    dispatch({ type: Tang_So_Luong, payload: cart });
  };
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const tinhGiaKM = (km) => {
    setKhuyenMaiInCart(km);
    let tongTien = cartState.cart.products.reduce(
      (tongTien, product) => tongTien + product.tongGia,
      0
    );
    tongTien = tongTien - (tongTien * km.giaTriKM) / 100;
    let cart = { products: cartState.cart.products, tongTien };

    dispatch({ type: TINH_GIA_KM, payload: cart });
  };
  const cartContextData = {
    cartState,
    addProductToCart,
    deleteProductInCart,
    datHang,
    getCart,
    khuyenMaiInCart,
    showToast,
    tinhGiaKM,
    setShowToast,
    tangSoLuong,
  };

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
