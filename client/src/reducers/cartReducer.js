import { GET_CART } from "../contexts/constants"

export const cartReducer = (state, action) => {
    const { type, payload }= action

    switch (type) {
        case GET_CART:
            return {
                ...state,
                cartLoading: false,
                cart: payload
            }
        default:
            return state
    }
}