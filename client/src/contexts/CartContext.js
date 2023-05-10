import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-toastify";
import { cartReducer } from "../reducers/cartReducer";
import { AuthContext } from "./AuthContext";
import {
  Add_PRODUCT_TO_CART,
  apiUrl,
  DELETE_PRODUCT_IN_CART,
  GET_CART,
  RESET_CART,
  Tang_So_Luong,
} from "./constants";
import { KhuyenMaiContext } from "./KhuyenMaiContext";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const {khuyenMaiState:{danhSachKhuyenMai},getDSKhuyenMai} = useContext(KhuyenMaiContext)
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
    //  tính tổng tiền của giỏ hàng
      let tongTien = cart.products.reduce((tongTien, e) => e.tongGia + tongTien, 0);
      cart = tinhGiaKM({...cart, tongTien});
    }

    dispatch({ type: GET_CART, payload: cart });
  };
  useEffect(() => {
    getCart();
  }, [danhSachKhuyenMai,khuyenMaiInCart]);

  useEffect(()=>{
    getDSKhuyenMai()
  },[])
  // làm mới giỏ hàng
  const resetCart = async () => {
    localStorage.removeItem("cart")
    dispatch({ type: RESET_CART, payload: { products: [], tongTien: 0 } });
  };
  // đặt hàng
  const datHang = async ({address,phone}) => {
    if (cartState.cart.products.length===0) {
      toast.error('Giỏ hàng trống');
      return;
    }
    let data = { ...cartState.cart, msnd: user.msnd,mskm:null,diaChi:address,soDienThoai:phone};
    if (khuyenMaiInCart) {
        data = {...data, mskm:khuyenMaiInCart.mskm}
    }
    try {
      let res = await axios.post(`${apiUrl}/donhang`, data);
      if (res.data.success) {
        toast.success('Đặt hàng thành công')
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
      newVatTu.soLuong = parseInt(newVatTu.soLuong) + 1;
      newVatTu.tongGia += vatTu.tongGia;
      products.splice(trung, 1, newVatTu);
    } else {
      products = [...cartState.cart.products, vatTu];
    }
    //  tính tổng tiền của giỏ hàng
    let tongTien = products.reduce((tongTien, e) => e.tongGia + tongTien, 0);

    let cart = { products, tongTien };

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success('Đã thêm sản phẩm vào giỏ hàng')
    cart = tinhGiaKM({ products, tongTien });

    dispatch({ type: Add_PRODUCT_TO_CART, payload: cart });
  };
  const deleteProductInCart = async (vatTu) => {
    let products = cartState.cart.products.filter((e) => e.msvt !== vatTu.msvt);
    let tongTien = products.reduce((tongTien, e) => e.tongGia + tongTien, 0);

    let cart = { products, tongTien };
    localStorage.setItem("cart", JSON.stringify(cart));
    
    cart = tinhGiaKM({ products, tongTien });

    dispatch({ type: DELETE_PRODUCT_IN_CART, payload: cart });
    toast.success("Đã xoá sản phẩm khỏi giỏ hàng")
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
    
    let cart = tinhGiaKM({ products, tongTien });
    
    dispatch({ type: Tang_So_Luong, payload: cart });
    localStorage.setItem("cart", JSON.stringify(cart));
    
  };
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const tinhGiaKM = (cart) => {

    // tính tổng tiền trước khi áp dụng khuyến mãi
    let tongTien = cart.tongTien;
    let km =null;
    // chọn khuyến mãi phù hợp
    danhSachKhuyenMai.map(khuyenMai=>{

      if (km && km.giaTriKM > khuyenMai.giaTriKM){
        return;
      }

      if (tongTien >= khuyenMai.dieuKien ) {
        km= khuyenMai;

        setKhuyenMaiInCart(khuyenMai);
      }
      
    });
    if (khuyenMaiInCart && tongTien < khuyenMaiInCart.dieuKien){
      km = null;
      setKhuyenMaiInCart(null)
    }

    // tính tiên được khuyến mãi
    if (km){
      tongTien = tongTien - (tongTien * km.giaTriKM) / 100;
    }
    //gán tiền đã tính vào cart
    cart = { ...cart, tongTien };
    return cart;

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
