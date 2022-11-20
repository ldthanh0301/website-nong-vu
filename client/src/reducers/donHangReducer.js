import { DAT_HANG, GET_ORDERS } from "../contexts/constants"

export const donHangReducer = (state, action) => {
    const { type, payload }= action

    switch (type) {
        case DAT_HANG:
            return {
                ...state,
                ordersLoading: false,
                donHang: payload
            }
        case GET_ORDERS:
            return {
                ...state,
                ordersLoading: false,
                orders: payload
            }
        default:
            return state
    }
}