import { Add_PRODUCT_TO_CART, DAT_HANG, DELETE_PRODUCT_IN_CART, GET_CART, RESET_CART } from "../contexts/constants"

export const cartReducer = (state, action) => {
    const { type, payload }= action

    switch (type) {
        case GET_CART:
            return {
                ...state,
                cartLoading: false,
                cart: {...state.cart,...payload}
            }
        case Add_PRODUCT_TO_CART:
            return {
                ...state,
                cartLoading: false,
                cart: {...state.cart,...payload}
            }
        case DELETE_PRODUCT_IN_CART:
            return {
                ...state,
                cartLoading: false,
                cart: payload
            }
        case DAT_HANG: 
            return {
                ...state,
                cartLoading:false,
                cart: payload
            }
        case RESET_CART: 
            return {
                ...state,
                cartLoading:false,
                cart: {...state.cart,...payload}
            }
        default:
            return state
    }
}