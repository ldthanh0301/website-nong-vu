import { DAT_HANG, GET_ORDERS, GET_ORDERS_BY_USER, GET_ORDER_INFO } from "../contexts/constants"

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
        case GET_ORDERS_BY_USER:
            return {
                ...state,
                ordersLoading: false,
                orders: payload
            }
        case GET_ORDER_INFO:
            return {
                ...state,
                orderInfo: payload,
                orderInfoLoading: false
            }
        default:
            return state
    }
}