import axios from "axios";
import { createContext, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { apiUrl, GET_CART } from "./constants";

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    
    const [cartState, dispatch] = useReducer(cartReducer, {
        cart: null,
        cartLoading: true
    })
    // get cart 
    const getCart = async (userId) => {
        try {
            const response = await axios.get(`${apiUrl}/carts/${userId}`)
            if (response.data.success) {
                console.log("cart",response.data.cart)
                dispatch({type: GET_CART, payload: response.data.cart})
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    const cartContextData = {cartState,getCart}

    return (
        <CartContext.Provider value={cartContextData}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider