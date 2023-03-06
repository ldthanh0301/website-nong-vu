import { Add_PRODUCT_TO_CART, DAT_HANG, DELETE_PRODUCT_IN_CART, GET_CART, RESET_CART, Tang_So_Luong, TINH_GIA_KM } from "../contexts/constants"

export const cartReducer = (state, action) => {
    const { type, payload }= action

    switch (type) {
        case GET_CART:
            return {
                ...state,
                cart: payload
            }
        case Add_PRODUCT_TO_CART:
            return {
                ...state,
                cart: payload
            }
        case DELETE_PRODUCT_IN_CART:
            return {
                ...state,
                cart: payload
            }
        case Tang_So_Luong:
            return {
                ...state,
                cart: payload
            }
        case TINH_GIA_KM:
            return {
                ...state,
                cart: payload
            }
        case DAT_HANG: 
            return {
                ...state,
                cart: payload
            }
        case RESET_CART: 
            return {
                ...state,
                cart: {...state.cart,...payload}
            }
        default:
            return state
    }
}