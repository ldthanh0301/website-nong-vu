import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { Add_PRODUCT_TO_CART, apiUrl, DELETE_PRODUCT_IN_CART, GET_CART, RESET_CART } from "./constants";

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    
    const [cartState, dispatch] = useReducer(cartReducer, {
        cart: {
            products:[],
            msnd: 0,
            msgh:0,
            tongTien:10000
        },
        cartLoading: true
    })
    // get cart 
    const getCart = async (msnd) => {
        try {
            const response = await axios.get(`${apiUrl}/giohang/${msnd}`)
            if (response.data.success) {
                dispatch({type: GET_CART, payload: response.data.cart})
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    // làm mới giỏ hàng
    const resetCart = async () => {
        try {
            const response = await axios.delete(`${apiUrl}/giohang/${cartState.cart.msgh}`)
            if (response.data.success) {
                dispatch({type: RESET_CART, payload: response.data.cart})
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    // đặt hàng
    const datHang = async () => {
        let data = cartState.cart;
        try {
            let res = await  axios.post(`${apiUrl}/dathang`, data)
            if(res.data.success){
                setShowToast({ show: true, message:'Đạt hàng thành công', type:null})
                resetCart()
            } 
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    const addProductToCart = async (vattu) => {
        
        try {
            const chiTietGioHang = {
                msvt: vattu.msvt,
                msnd: cartState.cart.msnd,
                msgh: cartState.cart.msgh,
                soLuong: 1,
                tongGia:10000
            }

            const res = await axios.post(`${apiUrl}/giohang/`,chiTietGioHang)
            dispatch({type: Add_PRODUCT_TO_CART, payload: res.data.cart})
        } catch (error) {
            // return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    const deleteProductInCart = async (msctgh)=> {
        try {
            const res = await axios.delete(`${apiUrl}/giohang/${msctgh}`)
            if (res.data.success) {
                let res = await axios.get(`${apiUrl}/giohang/${cartState.cart.msnd}`)
                dispatch({type: DELETE_PRODUCT_IN_CART, payload: res.data.cart})
                return res.data
            }
        } catch (error) {
            
        }
    }
    const [showToast, setShowToast] = useState({ show: false, message:'', type:null})  

    const cartContextData = {
        cartState,
        getCart,
        addProductToCart, 
        deleteProductInCart,
        datHang,
        showToast,
        setShowToast
    }

    return (
        <CartContext.Provider value={cartContextData}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider