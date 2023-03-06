import { ADD_KHUYENMAI, DELETE_KHUYENMAI, GET_KHUYENMAI, GET_KHUYENMAI_DETAIL, SET_KHUYENMAI } from "../contexts/constants"

export const khuyenMaiReducer = (state, action) => {
    const { type, payload }= action

    switch (type) {
        case SET_KHUYENMAI:
            return {
                ...state,
                khuyenMai: null,
            }
        case GET_KHUYENMAI:
            return {
                ...state,
                khuyenMaiLoading: false,
                danhSachKhuyenMai: payload
            }
        case GET_KHUYENMAI_DETAIL:
            return {
                ...state,
                khuyenMaiLoading: false,
                khuyenMai: payload
            }
        default:
            return state
    }
}